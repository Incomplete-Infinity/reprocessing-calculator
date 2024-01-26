/**
 * @name extractIds_
 */
const extractIds_ = (dirtyTypeIds) => [
  ...new Set(
    dirtyTypeIds
      .flat(Infinity)
      .filter(Number)
      .sort((a, b) => a - b)
  ),
];

const sheets = SpreadsheetApp.getActiveSpreadsheet();

const values = {
  tradeHubs: [
    {
      name: "Jita",
      type: 60003760,
    },
    {
      name: "Amarr",
      type: 60008494,
    },
    {
      name: "Dodixie",
      type: 60011866,
    },
    {
      name: "Rens",
      type: 60004588,
    },
    {
      name: "Hek",
      type: 60005686,
    },
  ],
  gas: {
    range: "gasTab",
    types: [30370, 30371, 30372, 30373, 30374, 30375, 30376, 30377, 30378],
  },
  ore: {
    range: "oreTab",
    types: [
      18, 19, 20, 21, 22, 1223, 1224, 1225, 1226, 1227, 1228, 1229, 1230, 1231,
      1232, 11396, 17425, 17426, 17428, 17429, 17432, 17433, 17436, 17437,
      17440, 17441, 17444, 17445, 17448, 17449, 17452, 17453, 17455, 17456,
      17459, 17460, 17463, 17464, 17466, 17467, 17470, 17471, 17865, 17866,
      17867, 17868, 17869, 17870,
    ],
  },
  salvage: {
    range: "salTab",
    types: [
      30018, 30019, 30021, 30022, 30024, 30248, 30251, 30252, 30254, 30258,
      30259, 30268, 30269, 30270, 30271,
    ],
  },
  sleeper: {
    types: [
      30188, 30189, 30190, 30191, 30192, 30193, 30194, 30195, 30196, 30197,
      30198, 30199, 30200, 30201, 30202, 30203, 30204, 30205, 30206, 30207,
      30208, 30209, 30210, 30211, 30212, 30213, 30214, 30215, 30216, 30217,
      30460, 30461, 30462, 37472, 37473,
    ],
    missiles: {
      types: [30426, 30428, 30430],
    },
  },
};
/**
 * @const
 * @name loadRegionAggregates
 *
 * @summary Returns aggregated market data for given type IDs from https://market.fuzzwork.co.uk.
 *
 * @description The function takes 3 arguments:
 * typeIds (an array of type IDs),
 * regionId (a string representing the region ID),
 * and showHeaders (a flag indicating whether to include headers in the output).
 * The function returns an array of market data, with each row representing a type ID.
 * If the typeIds argument is not defined, an error will be thrown.
 * The function uses the extractIds helper function to filter and sort the type IDs.
 * The main function uses UrlFetchApp.fetch to retrieve data from the website and parse it as JSON.
 * The retrieved data is then processed and formatted into a 2D array, with the headers included based on the showHeaders argument.
 * The Math.random() * 5000 calculation is used to introduce a random sleep time between requests to the server in order to reduce the load on the server.
 *
 * @param {number[]} typeIds - An array of type IDs to retrieve market data for.
 * @param {string} regionId - The region ID to retrieve market data for.
 * @param {boolean} showHeaders - A flag indicating whether to include headers in the output.
 *
 * @returns {Array} - An array of market data, with each row representing a type ID.
 *
 * @throws {Error} If there is an error fetching the data from the server.
 */
const loadRegionAggregates = (
  typeIds = false,
  regionId = 10000002,
  showHeaders = true
) => {
  const prices = [];

  const endpoint = `https://market.fuzzwork.co.uk/aggregates/`;
  const options = {
    method: `get`,
    payload: ``,
  };

  if (!typeIds) {
    throw new Error(`Required variable "typeIds" is not defined!`);
  }

  const cleanTypeIds = extractIds_(typeIds);

  if (showHeaders) {
    prices.push([
      `Type ID`,

      `Buy Weighted Mean`,
      `Highest Offer`,
      `Buy Median`,
      `Buy Volume`,
      `Buy Order Count`,
      `Buy 5% Mean`,

      `Sell Weighted Mean`,
      `Lowest Bid`,
      `Sell Median`,
      `Sell Volume`,
      `Sell Order Count`,
      `Sell 5% Mean`,
    ]);
  }

  while (cleanTypeIds.length > 0) {
    Utilities.sleep(Math.random() * 5000);
    const chunk = Math.min(100, cleanTypeIds.length);
    const types = cleanTypeIds.splice(0, chunk);
    const encodedTypes = types.join(`,`);
    const queryObject = {
      region: regionId,
      types: types.join(","),
    };
    const encodeQuery = (object) =>
      object.reduce((accumulator, element) => `${accumulator}${element}`, []);
    const query = `?region=${regionId}&types=${encodedTypes}`;
    const url = `${endpoint}${query}`;
    const json = JSON.parse(UrlFetchApp.fetch(url, options).getContentText());
    //const json = cacheUrlFetchApp_(url, options);
    types.forEach((type) => {
      const { buy, sell } = json[type];
      prices.push([
        +type,

        +buy.weightedAverage,
        +buy.max,
        +buy.median,
        +buy.volume,
        +buy.orderCount,
        +buy.percentile,

        +sell.weightedAverage,
        +sell.min,
        +sell.median,
        +sell.volume,
        +sell.orderCount,
        +sell.percentile,
      ]);
    });
  }

  return prices;
};
