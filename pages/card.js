import React from 'react'

const card = (height ,witdh , padding) => {
  return (
    <div>
        <div class="border border-gray-200 rounded-lg p-6 hover:border-gray-300 transition-all">
                <div class="flex justify-between items-start mb-4">
                    <div>
                        <h3 class="text-xl font-semibold mb-2">Pune to Lonavala</h3>
                        <p class="text-gray-600 text-sm">Approximate distance: 67 km</p>
                    </div>
                    <span class="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">Popular</span>
                </div>

                <div class="space-y-4">
                    <div class="flex items-center gap-3">
                        <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <span class="text-gray-600">Average travel time: 1.5 hours</span>
                    </div>
                    <div class="flex items-center gap-3">
                        <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path>
                        </svg>
                        <span class="text-gray-600">Via Mumbai-Pune Express Highway</span>
                    </div>

                    <button class="w-full mt-4 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors" fdprocessedid="8vwwoi">
                        View Route Details
                    </button>
                </div>
            </div>
    </div>
  )
}

export default card