import {_} from '../dependencies/deps.ts'

interface Launch {
  flightNumber: number,
  mission: string,
  rocket: string,
  customers: Array<string>
  launchDate: number
  upcoming: boolean
  success?: boolean
  target?: string
}

const launches = new Map<number, Launch>()

async function downloadLaunchData() {
  const response = await fetch("https://api.spacexdata.com/v3/launches", {
    method: "GET"
  })

  const responseData = await response.json()

  for (const launch of responseData) {
    const payloads = launch["rocket"]["second_stage"]["payloads"]

    const customers = _.flatMap(payloads, (payload: any) => {
      return payload["customers"]
    })

    const flightData = {
      flightNumber: launch["flight_number"],
      mission: launch["mission_name"],
      rocket: launch["rocket"]["rocket_name"],
      customers: customers,
      launchDate: launch["launch_date_unix"],
      upcoming: launch["upcoming"],
      success: launch["launch_success"],
      target: launch[""]
    }

    launches.set(flightData.flightNumber, flightData)
    // log.info(JSON.stringify(flightData))
  }
}

await downloadLaunchData()

// log.info(`Descargada data para ${launches.size} SpaceX lanzamientos`)

export function getAllLaunches() {
  return Array.from(launches.values())
}

export function getLaunchesById(id: number) {
  // const launch = Array.from(launches.values()).filter(launch => launch.flightNumber === id)
  // log.info(JSON.stringify(launch))
  // return launch
  if (launches.has(id)) {
    return launches.get(id)
  } else {
    return null
  }
}

export async function addNewLaunch(launch: Launch) {
  const launchToSet = Object.assign(launch, {
    upcoming: true,
    customers: ["Nasa", "Zero master Deno"]
  })
  launches.set(launchToSet.flightNumber, launchToSet)
}

export function deleteLaunchesById(id: number) {
  if (launches.has(id)) {
    const aborted = launches.get(id)
    if (aborted) {
      aborted.upcoming = false
      aborted.success = false
    }
    return aborted
  } else {
    return null
  }
}
