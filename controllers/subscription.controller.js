import Subscription from "../models/subscription.model.js"
import { workflowClient } from "../config/upstash.js"
import dotenv from 'dotenv'

dotenv.config();


export const createSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.create({
            ...req.body,
            user: req.user._id
        })

        const { workflowRunId } = await workflowClient.trigger({
            url: `${process.env.SERVER_URL}/workflows/subscription/reminder`,
            body: {
                subscriptionId: subscription.id,
            },
            headers: {
                'content-type': 'application/json',
            },
            retries: 0,
        })

        res.status(201).json({ success: true, data: { subscription, workflowRunId } })
    } catch (error) {
        next(error)
    }
}