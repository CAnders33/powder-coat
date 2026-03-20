export default {
  name: 'trustFeature',
  title: 'Trust Feature',
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
      name: 'icon',
      title: 'Icon Name',
      type: 'string',
      description: 'Material UI icon name (e.g., "Verified", "Speed", "Nature")',
      options: {
        list: [
          { title: 'Verified', value: 'Verified' },
          { title: 'Speed', value: 'Speed' },
          { title: 'Nature', value: 'Nature' },
          { title: 'Security', value: 'Security' },
          { title: 'Support', value: 'Support' },
          { title: 'Quality', value: 'HighQuality' }
        ]
      }
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which this feature appears (1, 2, 3, etc.)'
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description'
    }
  },
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }]
    }
  ]
}
