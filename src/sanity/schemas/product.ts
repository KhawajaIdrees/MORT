export default {
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Product Name",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "description",
      title: "Description",
      type: "text",
    },
    {
      name: "price",
      title: "Price ($)",
      type: "number",
      validation: (Rule: any) => Rule.required().min(0),
    },
    {
      name: "originalPrice",
      title: "Original Price ($)",
      type: "number",
    },
    {
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "category" }],
    },
    {
      name: "collection",
      title: "Collection",
      type: "reference",
      to: [{ type: "collection" }],
    },
    {
      name: "images",
      title: "Product Images",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    },
    {
      name: "sizes",
      title: "Available Sizes",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Small (S)", value: "S" },
          { title: "Medium (M)", value: "M" },
          { title: "Large (L)", value: "L" },
          { title: "X-Large (XL)", value: "XL" },
          { title: "XX-Large (XXL)", value: "XXL" },
          { title: "Size 30", value: "30" },
          { title: "Size 32", value: "32" },
          { title: "Size 34", value: "34" },
          { title: "One Size", value: "One Size" },
        ],
      },
    },
    {
      name: "colors",
      title: "Colors",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "name", title: "Color Name", type: "string" },
            { name: "hex", title: "Hex Code", type: "string" },
          ],
        },
      ],
    },
    {
      name: "isFeatured",
      title: "Featured Product",
      type: "boolean",
      initialValue: false,
    },
    {
      name: "isNew",
      title: "New Arrival",
      type: "boolean",
      initialValue: true,
    },
    {
      name: "details",
      title: "Product Specifications / Details",
      type: "array",
      of: [{ type: "string" }],
    },
    {
      name: "care",
      title: "Garment Care Instructions",
      type: "array",
      of: [{ type: "string" }],
    },
  ],
};
