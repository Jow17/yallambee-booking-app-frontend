import React from "react"

const SearchBar = () => {
  return (
    <>
        <form class="max-w-x1 mx-auto">   
            <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
        <div class="relative">
            <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
        </div>
        <input type="search" id="default-search" 
            class="block w-full p-5 ps-10 text-sm text-gray-900 border border-black-300 rounded-lg bg-black-50 focus:ring-green-500 focus:border--500 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-blackdark:focus:ring-green-500 dark:focus:border-green-500" placeholder="Search Properties..." required />
            <button type="submit" class="text-white absolute end-2.5 bottom-2.5 bg-lime-700 hover:bg-lime-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-lime-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Search</button>
    </div>
    
</form>
    </>
  )
}

export default SearchBar