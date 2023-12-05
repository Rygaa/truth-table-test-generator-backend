
const DEFAULT_PRESET = [
    {
      type: "text",
      name: "scientificname",
      mandatory: true,
      archived: false,
      index: 0,
    },
    {
      type: "text",
      name: "commonname",
      mandatory: true,
      archived: false,
      index: 1,
    },
    {
      type: "dimensions",
      name: "Plant's height",
      unit: "cm",
      mandatory: false,
      archived: false,
      index: 2,
    },
    {
      type: "long-text",
      name: "Plant's Characteristics",
      mandatory: false,
      archived: false,
      index: 3,
    },
    {
      type: "date",
      name: "Grow Data",
      mandatory: false,
      archived: false,
      index: 4,
    },
    {
      type: "file",
      name: "Additional Information",
      mandatory: false,
      archived: false,
      index: 5,
    },
    { type: "color", name: "Color", mandatory: false, archived: false, index: 6 },
  ];

  module.exports = DEFAULT_PRESET