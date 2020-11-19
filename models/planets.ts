import {BufReader, join, parse, _, log} from '../dependencies/deps.ts'

type Planet = Record<string, string>

let planets : Array<Planet>

export function filterHabitablePlanets (planets: Array<Planet>) {
  return planets.filter((planet: Planet) => {
    const planetRadius = Number(planet['koi_prad'])
    const stallerMass = Number(planet['koi_smass'])
    const stallerRadius = Number(planet['koi_srad'])

    return planet['koi_disposition'].toUpperCase() === 'CONFIRMED'.toUpperCase() &&
      planetRadius > 0.5 && planetRadius < 1.5 &&
      stallerMass > 0.78 && stallerMass < 1.04 &&
      stallerRadius > 0.99 && stallerRadius < 1.01
  })

}

async function loadPlanetData() {
  const path = join("data", "kepler_exoplanets_nasa.csv")
  const file = await Deno.open(path)
  const bufReader = new BufReader(file)
  const result = await parse(bufReader, {
    skipFirstRow: true,
    comment: "#"
  })

  Deno.close(file.rid)

  const planetsConfirmed = filterHabitablePlanets(result as Array<Planet>)

  return planetsConfirmed.map((planet) => {
    return _.pick(planet, [
      'koi_prad',
      'koi_smass',
      'koi_srad',
      'kepoi_name',
      'kepler_name',
      'koi_count',
      'koi_steff',
    ])
  })
}

planets = await loadPlanetData()
log.info(`${planets.length} habitable planets found`)
export function getAllPlanets() {
  return planets
}