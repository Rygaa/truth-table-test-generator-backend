const {faker} = require("@faker-js/faker")
const PLANT_DATA = [
      [
        { value: `Fragaria x ananassa 'Roman'` },
        { value: `Strawberry 'Roman'` },
        { value: `15-23` },
        {
          value: `Glossy foliage, large flowers and delicious, aromatic fruit make this highly ornamental Strawberry a favorite among home gardeners!`,
        },
        {
          startDate: `1 4`,
          endsDate: `28 7`,
        },
        { value: `${"Strawberry"}.dwg` },
        {
          value: `${"red"}`,
        },
      ],
  
      [
        { value: `Satsuma Orange 'Armstrong'` },
        { value: `Citrus reticulata` },
        { value: `300-610` },
        {
          value: `Enjoy high yields of delicious sweet oranges. ‘Armstrong’ oranges are exceptionally easy to peel making it easy to prepare them quickly for eating fresh or tossing into salads`,
        },
        {
          startDate: `1 10`,
          endsDate: `28 12`,
        },
        { value: `${"Orange"}.pdf` },
        {
          value: `${"orange"}`,
        },
      ],
  
      [
        { value: `Agapanthus species` },
        { value: `African Lily Indoors` },
        { value: `60-90` },
        {
          value: `Agapanthus is Native to South Africa. The tall vertical flower stems are topped by a lush cluster of blooms.`,
        },
        {
          startDate: `1 5`,
          endsDate: `28 7`,
        },
        { value: `${"African Lily"}.png` },
        {
          value: `${"#ADD8E6"}`,
        },
      ],
  
      [
        { value: `Apple 'Dorsett Golden'` },
        { value: `Malus pumila` },
        { value: `270-370` },
        {
          value: `One of the few apple varieties suitable for hot climates. This apple was first grown from seed in the 1950’s by Irene Dorsett, at her residence in The Bahamas. `,
        },
        {
          startDate: `1 3`,
          endsDate: `28 11`,
        },
        { value: `${"apple-grow"}.mp4` },
        {
          value: `${"yellow"}`,
        },
      ],
  
      [
        { value: `Black Raspberry 'Cumberland'` },
        { value: `Rubus idaeus` },
        { value: `90-180` },
        {
          value: `One of the most popular blackberry varieties. Produces an abundance of large sweet berries mid-season. Particularly good for freezing and canning.`,
        },
        {
          startDate: `1 4`,
          endsDate: `28 8`,
        },
        { value: `${"Black Raspberry"}.jpg` },
        {
          value: `${"black"}`,
        },
      ],
  
      [
        { value: `Weigela 'Rumba'` },
        { value: `Weigela florida` },
        { value: `90-150` },
        {
          value: `Compact, deciduous shrub produces masses of tubular red flowers in spring. Light green leaves are edged with burgundy.`,
        },
        {
          startDate: `1 4`,
          endsDate: `28 6`,
        },
        { value: `${"Weigela 'Rumba'"}.csv` },
        {
          value: `${"rgb(255, 0, 255)"}`,
        },
      ],
  
      [
        { value: `Creeping Bellflower, Campanula` },
        { value: `Campanula rapunculoides` },
        { value: `61-81` },
        {
          value: `Slim stalks of starry, drooping bells put on a delightful display right into autumn. A vigorous spreader excellent for filling large areas quickly.`,
        },
        {
          startDate: `1 5`,
          endsDate: `28 7`,
        },
        { value: `${"Creeping Bellflower"}.pdf` },
        {
          value: `${"rgb(138, 43, 226)"}`,
        },
      ],
    ];
  

module.exports.PLANT_DATA =PLANT_DATA