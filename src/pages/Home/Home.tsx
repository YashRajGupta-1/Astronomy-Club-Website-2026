import NebulaBackground from '@/components/common/NebulaBackground'

const Home = () => {
  return (
    <div className='w-full min-h-screen relative'>

      <div className="relative w-full min-h-screen flex items-center justify-center">
        <div className="w-full h-screen absolute top-0 left-0 -z-10 opacity-90">
          <NebulaBackground />
        </div>
        <h1 className="text-4xl font-bold text-white bg-neutral-900/50">Step into the Wonders of the Astronomy Club!</h1>
        <div className="h-[1000px]">hey</div>
      </div>
    </div>
  )
}

export default Home
