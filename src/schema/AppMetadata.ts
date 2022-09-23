import z from 'zod';

const AppMetadataSchema = z.object({
  title: z.string().default('Eviate'),
  description: z.string().default(''),
  version: z.string().default('1.0.0')
});


export type AppMetadata = z.output<typeof AppMetadataSchema>;