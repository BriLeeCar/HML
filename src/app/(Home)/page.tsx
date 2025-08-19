import countryPaths from '~/data/mapPathData.json'
import { Map, Path, tCountryPaths } from '../map/Map'
import { MapBtn, NowBtn, SmallBtns } from './Buttons'
import { HeadingText } from './HeadingText'
import { Img } from './SidebarImg'

const Home = async () => {
	return (
		<main className='relative grid h-auto min-h-screen w-screen grid-cols-[1fr_1fr] overflow-x-hidden min-[1200px]:static min-[1200px]:w-[75vw]'>
			<Img />
			<div className='relative inline-flex max-w-[70vw] flex-col items-center justify-center gap-6 self-stretch py-3 pl-0'>
				<HeadingText />
				<div className='flex flex-col items-center justify-start self-stretch px-3 pt-12 text-white italic'>
					<NowBtn />
					<SmallBtns />
				</div>
				<MapBtn />
			</div>
			<div className='absolute -top-10 -right-40 -z-1 hidden h-1/2 w-[50vw] -rotate-5 overflow-clip min-[600px]:h-screen min-[1200px]:translate-y-0 min-[1200px]:rotate-0 md:block'>
				<Map className='lg:max-h-fill xl: h-auto w-screen shadow-none lg:relative lg:w-screen'>
					{Object.keys(countryPaths).map((countryName) => {
						const { path, tier, haveData, abbr } = countryPaths[
							countryName as keyof typeof countryPaths
						] as tCountryPaths[string]
						return (
							<Path
								key={countryName}
								name={countryName}
								abb={abbr}
								tier={tier}
								haveData={haveData}
								path={path}
							/>
						)
					})}
				</Map>
			</div>
		</main>
	)
}

export default Home
