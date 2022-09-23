import z from 'zod';

export const AppMetadataSchema = z.object({
  title: z.string().default('Eviate'),
  description: z.string().default(''),
  version: z.string().default('1.0.0')
});

export type AppMetadataInput = z.input<typeof AppMetadataSchema>;
export type AppMetadataOutput = z.output<typeof AppMetadataSchema>;
