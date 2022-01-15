import React from 'react'

function Test() {
  return (
    <React.Fragment>
      <div className="flex flex-row w-full">
        <div className="w-1/4 flex">
          <div className="bg-amber-300 w-1/2 border-2 border-neutral-900 flex flex-col">
            <div className="text-center">Sunday</div>
            <div className="border-t-2 border-neutral-900 h-28"></div>
          </div>

          <div className="bg-lime-500 w-1/2 border-2 border-neutral-900 flex flex-col">
            <div className="text-center">Monday</div>
            <div className="border-t-2 border-neutral-900 h-28"></div>
          </div>
        </div>
        <div className="w-1/4 flex">
          <div className="bg-red-500 w-1/2 border-2 border-neutral-900 flex flex-col">
            <div className="text-center">Tuesday</div>
            <div className="border-t-2 border-neutral-900 h-28"></div>
          </div>
          <div className="bg-cyan-600 w-1/2 border-2 border-neutral-900 flex flex-col">
            <div className="text-center">Wednesday</div>
            <div className="border-t-2 border-neutral-900 h-28"></div>
          </div>
        </div>
        <div className="w-1/4 flex">
          <div className="bg-fuchsia-300 w-1/2 border-2 border-neutral-900 flex flex-col">
            <div className="text-center">Thursday</div>
            <div className="border-t-2 border-neutral-900 h-28"></div>
          </div>
          <div className="bg-red-200 w-1/2 border-2 border-neutral-900 flex flex-col">
            <div className="text-center">Fiday</div>
            <div className="border-t-2 border-neutral-900 h-28"></div>
          </div>
        </div>
        <div className="w-1/4 flex">
          <div className="bg-neutral-500 w-1/2 border-2 border-neutral-900 flex flex-col">
            <div className="text-center">Saturday</div>
            <div className="border-t-2 border-neutral-900 h-28"></div>
          </div>
          <div className="bg-stone-50 w-1/2 border-2 border-neutral-900 flex flex-col">
            <div>Notes:</div>
            <div className="border-t-2 border-neutral-900 h-28"></div>
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="flex">
          <div className="w-1-3">Habit 1</div>
          <div className="flex-grow justify-around flex">
            <div className="rounded-full w-8 h-8 bg-emerald-500"></div>
            <div className="rounded-full w-8 h-8 bg-emerald-500"></div>
            <div className="rounded-full w-8 h-8 bg-emerald-500"></div>
            <div className="rounded-full w-8 h-8 bg-emerald-500"></div>
            <div className="rounded-full w-8 h-8 bg-emerald-500"></div>
            <div className="rounded-full w-8 h-8 bg-emerald-500"></div>
            <div className="rounded-full w-8 h-8 bg-emerald-500"></div>
          </div>
        </div>
        <div className="flex">
          <div className="w-1-3">Habit 2</div>
          <div className="flex-grow justify-around flex">
            <div className="rounded-full w-8 h-8 bg-sky-500"></div>
            <div className="rounded-full w-8 h-8 border-sky-500 border-2"></div>
            <div className="rounded-full w-8 h-8 bg-sky-500"></div>
            <div className="rounded-full w-8 h-8 bg-sky-500"></div>
            <div className="rounded-full w-8 h-8 bg-sky-500"></div>
            <div className="rounded-full w-8 h-8 bg-sky-500"></div>
            <div className="rounded-full w-8 h-8 bg-sky-500"></div>
          </div>
        </div>
        <div className="flex">
          <div className="w-1-3">Habit 3</div>
          <div className="flex-grow justify-around flex">
            <div className="rounded-full w-8 h-8 bg-red-500"></div>
            <div className="rounded-full w-8 h-8 bg-red-500"></div>
            <div className="rounded-full w-8 h-8 bg-red-500 text-center ">
              2
            </div>
            <div className="rounded-full w-8 h-8 bg-red-500"></div>
            <div className="rounded-full w-8 h-8 bg-red-500"></div>
            <div className="rounded-full w-8 h-8 bg-red-500"></div>
            <div className="rounded-full w-8 h-8 bg-red-500"></div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Test
