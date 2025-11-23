import type { Response } from 'express'
import type { AuthenticatedRequest } from '../middleware/auth.ts'
import db from '../db/connection.ts'
import { habits, habitTags } from '../db/schema.ts'
import { and, desc, eq } from 'drizzle-orm'

export const createHabit = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { name, description, frequency, targetCount, tagIds } = req.body

    const results = await db.transaction(async (trx) => {
      const [newHabit] = await trx
        .insert(habits)
        .values({
          userId: req.user.id,
          name,
          description,
          frequency,
          targetCount,
        })
        .returning()

      if (tagIds && tagIds.length > 0) {
        const habitTagValues = tagIds.map((tagId: number) => ({
          habitId: newHabit.id,
          tagId,
        }))
        await trx.insert(habitTags).values(habitTagValues)
      }
      return newHabit
    })

    return res.status(201).json({
      message: 'Habit created successfully',
      habit: results,
    })
  } catch (e) {
    console.error('Error creating habit:', e)
    return res.status(500).json({ error: 'Failed to create habit' })
  }
}

export const getHabits = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userHabitsWithTags = await db.query.habits.findMany({
      where: eq(habits.userId, req.user.id),
      with: {
        tags: {
          with: {
            tag: true,
          },
        },
      },
      orderBy: [desc(habits.createdAt)],
    })

    const formattedHabits = userHabitsWithTags.map((habit) => ({
      ...habit,
      tags: habit.tags.map((ht) => ht.tag),
    }))
    return res.status(200).json({
      habits: formattedHabits,
    })
  } catch (e) {
    console.error('Error retrieving habits:', e)
    return res.status(500).json({ error: 'Failed to retrieve habits' })
  }
}

export const updateHabit = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const id = req.params.id
    const { tagIds, ...updatedFields } = req.body

    console.log('updated', req.body)

    const results = await db.transaction(async (trx) => {
      const [updatedHabit] = await trx
        .update(habits)
        .set({
          ...updatedFields,
          updatedAt: new Date(),
        })
        .where(and(eq(habits.id, id), eq(habits.userId, req.user.id)))
        .returning()

      if (!updatedHabit) {
        return null
      }

      if (tagIds !== undefined) {
        await trx.delete(habitTags).where(eq(habitTags.habitId, id))

        if (tagIds.length > 0) {
          const habitTagValues = tagIds.map((tagId: number) => ({
            habitId: id,
            tagId,
          }))
          await trx.insert(habitTags).values(habitTagValues)
        }
      }
      return updatedHabit
    })

    if (!results) {
      return res.status(404).json({ error: 'Habit not found' })
    }

    return res.status(200).json({
      message: 'Habit updated successfully',
      habit: results,
    })
  } catch (e) {
    console.error('Error updating habit:', e)
    return res.status(500).json({ error: 'Failed to update habit' })
  }
}
