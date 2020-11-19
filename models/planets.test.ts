import {filterHabitablePlanets} from './planets.ts'
import {assertEquals} from '../dependencies/deps.ts'

const HABITABLE_MOCK_PLANET = {
  koi_disposition: 'CONFIRMED',
  koi_prad: "1",
  koi_srad: "1",
  koi_smass: "1"
}

const NOT_HABITABLE_FALSE_POSITIVE_MOCK_PLANET = {
  koi_disposition: 'FALSE POSITIVE',
  koi_prad: "1.9",
  koi_srad: "1",
  koi_smass: "1"
}

const TOO_LARGE_MOCK_PLANETARY_RADIUS = {
  koi_disposition: 'CONFIRMED',
  koi_prad: "1.9",
  koi_srad: "1",
  koi_smass: "1"
}

const TOO_LARGE_MOCK_SOLAR_RADIUS = {
  koi_disposition: 'CONFIRMED',
  koi_prad: "1",
  koi_srad: "1.02",
  koi_smass: "1"
}

const TOO_LARGE_MOCK_SOLAR_MASS = {
  koi_disposition: 'CONFIRMED',
  koi_prad: "1",
  koi_srad: "1",
  koi_smass: "1.05"
}


Deno.test('Filter only Habitable Planet ', () => {
  const filtered = filterHabitablePlanets([
    HABITABLE_MOCK_PLANET,
    NOT_HABITABLE_FALSE_POSITIVE_MOCK_PLANET,
    TOO_LARGE_MOCK_PLANETARY_RADIUS,
    TOO_LARGE_MOCK_SOLAR_RADIUS,
    TOO_LARGE_MOCK_SOLAR_MASS
  ])
  assertEquals(filtered, [
    HABITABLE_MOCK_PLANET
  ])
})


/*
Deno.test({
  name: 'Filter only Habitable Planet ',
  ignore: false,
  sanitizeOps: true,
  sanitizeResources: false,
  async fn() {
    assertEquals([
      HABITABLE_MOCK_PLANET,
      NOT_HABITABLE_FALSE_POSITIVE_MOCK_PLANET,
      TOO_LARGE_MOCK_PLANETARY_RADIUS,
      TOO_LARGE_MOCK_SOLAR_RADIUS,
      TOO_LARGE_MOCK_SOLAR_MASS
    ], [
      HABITABLE_MOCK_PLANET
    ])
  }
})
*/
