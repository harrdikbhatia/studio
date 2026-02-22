'use server';
/**
 * @fileOverview This file implements a Genkit flow for predicting optimal parking slots and peak hours.
 *
 * - predictParkingSlots - A function that handles the parking prediction process.
 * - PredictParkingSlotsInput - The input type for the predictParkingSlots function.
 * - PredictParkingSlotsOutput - The return type for the predictParkingSlots function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PredictParkingSlotsInputSchema = z.object({
  destination: z.string().describe('The user\u0027s desired destination for parking.'),
  desiredParkingTime: z.string().describe('The user\u0027s desired date and time for parking (e.g., \u0022tomorrow at 10 AM\u0022, \u0022next Friday 3 PM\u0022).'),
  historicalDataSummary: z.string().describe('A detailed summary of historical parking occupancy data, including locations, times, and typical availability trends. This data helps the AI make informed predictions.'),
});
export type PredictParkingSlotsInput = z.infer<typeof PredictParkingSlotsInputSchema>;

const PredictParkingSlotsOutputSchema = z.object({
  predictedPeakHours: z.string().describe('A description of the predicted peak parking hours for the specified destination and time.'),
  suggestedSlots: z.array(z.string()).describe('A list of optimal parking slots suggested based on historical data and predicted availability.'),
  recommendation: z.string().describe('A general recommendation or advice for the user regarding their parking plan.'),
});
export type PredictParkingSlotsOutput = z.infer<typeof PredictParkingSlotsOutputSchema>;

export async function predictParkingSlots(input: PredictParkingSlotsInput): Promise<PredictParkingSlotsOutput> {
  return predictParkingSlotsFlow(input);
}

const predictParkingSlotsPrompt = ai.definePrompt({
  name: 'predictParkingSlotsPrompt',
  input: {schema: PredictParkingSlotsInputSchema},
  output: {schema: PredictParkingSlotsOutputSchema},
  prompt: `You are an intelligent parking assistant. Your goal is to help users find optimal parking spots and avoid congestion by predicting peak hours based on historical data.

Here is the user's request:
Destination: {{{destination}}}
Desired Parking Time: {{{desiredParkingTime}}}

Here is a summary of historical parking occupancy data relevant to the destination:
{{{historicalDataSummary}}}

Based on the provided information, predict the peak parking hours and suggest optimal parking slots. Also, provide a general recommendation.

Return the output in JSON format, strictly following the output schema described. The 'suggestedSlots' should be an array of strings. The 'predictedPeakHours' and 'recommendation' should be single strings.`,
});

const predictParkingSlotsFlow = ai.defineFlow(
  {
    name: 'predictParkingSlotsFlow',
    inputSchema: PredictParkingSlotsInputSchema,
    outputSchema: PredictParkingSlotsOutputSchema,
  },
  async input => {
    const {output} = await predictParkingSlotsPrompt(input);
    return output!;
  }
);
