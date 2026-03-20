export default {
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Page Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
      description: 'The main title displayed on the hero section'
    },
    {
      name: 'heroImage',
      title: 'Hero Background Image',
      type: 'image',
      options: {
        hotspot: true
      },
      validation: (Rule: any) => Rule.required(),
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          validation: (Rule: any) => Rule.required()
        }
      ]
    },
    {
      name: 'companyDescription',
      title: 'Company Description',
      type: 'text',
      rows: 4,
      validation: (Rule: any) => Rule.required(),
      description: 'A detailed description of the company and services'
    },
    {
      name: 'whyChooseUs',
      title: 'Why Choose Us Features',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Feature Title',
              type: 'string',
              validation: (Rule: any) => Rule.required()
            },
            {
              name: 'description',
              title: 'Feature Description',
              type: 'text',
              rows: 3,
              validation: (Rule: any) => Rule.required()
            },
            {
              name: 'icon',
              title: 'Icon',
              type: 'string',
              options: {
                list: [
                  { title: 'Quality Guarantee', value: 'quality' },
                  { title: 'Expert Experience', value: 'experience' },
                  { title: 'Fast Speed', value: 'speed' },
                  { title: 'Eco Friendly', value: 'eco' },
                  { title: 'Shield/Protection', value: 'shield' },
                  { title: 'Warranty', value: 'warranty' },
                  { title: 'Default Tool', value: 'tool' }
                ]
              },
              description: 'Choose an icon that represents this feature'
            }
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'description'
            }
          }
        }
      ],
      validation: (Rule: any) => Rule.min(1).max(6)
    },
    {
      name: 'testimonials',
      title: 'Customer Testimonials',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Customer Name',
              type: 'string',
              validation: (Rule: any) => Rule.required()
            },
            {
              name: 'quote',
              title: 'Testimonial Quote',
              type: 'text',
              rows: 3,
              validation: (Rule: any) => Rule.required()
            }
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'quote'
            }
          }
        }
      ],
      validation: (Rule: any) => Rule.min(1).max(6)
    },
    {
      name: 'callToAction',
      title: 'Call to Action Section',
      type: 'object',
      fields: [
        {
          name: 'heading',
          title: 'CTA Heading',
          type: 'string',
          validation: (Rule: any) => Rule.required()
        },
        {
          name: 'buttonText',
          title: 'Button Text',
          type: 'string',
          validation: (Rule: any) => Rule.required()
        }
      ],
      validation: (Rule: any) => Rule.required()
    }
  ],
  preview: {
    select: {
      title: 'title',
      media: 'heroImage'
    }
  }
}
