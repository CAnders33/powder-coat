export default {
  name: 'galleryImage',
  title: 'Gallery Image',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
    },
    {
      name: 'image',
      title: 'Image',
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
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Automotive', value: 'automotive' },
          { title: 'Industrial', value: 'industrial' },
          { title: 'Furniture', value: 'furniture' },
          { title: 'Architectural', value: 'architectural' },
          { title: 'Custom', value: 'custom' }
        ]
      }
    },
    {
      name: 'featured',
      title: 'Featured Image',
      type: 'boolean',
      description: 'Show this image in featured galleries',
      initialValue: false
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'image'
    }
  }
}
