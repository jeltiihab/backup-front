import React from 'react'
import Image from 'next/image'
import user from '../../public/images/user.png'
import AdminNavbar from '../../src/components/core/Adminnavbar/AdminNavbar'
import SideBar from '../../src/components/core/AdminSideBar/AdminSideBar'
import Footer from '../../src/components/core/AdminFooter/AdminFooter'
import withAuth from "../../utils/withAuth";
function index() {
    return (
<div>
    <div>
        <AdminNavbar/>
    <div className="flex overflow-hidden bg-white pt-16">
        <SideBar/>
        <div className="bg-gray-900 opacity-50 hidden fixed inset-0 z-10" id="sidebarBackdrop"></div>
        <div id="main-content" className="h-full w-full bg-gray-50 relative overflow-y-auto lg:ml-64">
            <main>
            <div className="mt-4 w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 pt-6 px-4">
                    <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                            <span className="text-2xl sm:text-3xl leading-none font-bold text-gray-900">2,340</span>
                            <h3 className="text-base font-normal text-gray-500">Propriétaires</h3>
                            </div>
                            <div className="ml-5 w-0 flex items-center justify-end flex-1 text-green-500 text-base font-bold">
                            14.6%
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                            </svg>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                            <span className="text-2xl sm:text-3xl leading-none font-bold text-gray-900">5,355</span>
                            <h3 className="text-base font-normal text-gray-500">Locataires</h3>
                            </div>
                            <div className="ml-5 w-0 flex items-center justify-end flex-1 text-green-500 text-base font-bold">
                            32.9%
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                            </svg>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                            <span className="text-2xl sm:text-3xl leading-none font-bold text-gray-900">385</span>
                            <h3 className="text-base font-normal text-gray-500">Réservations</h3>
                            </div>
                            <div className="ml-5 w-0 flex items-center justify-end flex-1 text-red-500 text-base font-bold">
                            -2.7%
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M14.707 12.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                            </svg>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="pt-6 px-4">
                <div className="grid grid-cols-1 xl:gap-4 my-4">
                    <div className="bg-white shadow rounded-lg mb-4 p-4 sm:p-6 h-full">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-bold leading-none text-gray-900">Nouveaux utilisateurs</h3>
                            <a href="#" className="text-sm font-medium text-cyan-600 hover:bg-gray-100 rounded-lg inline-flex items-center p-2">
                            Afficher tout
                            </a>
                        </div>
                        <div className="flow-root">
                            <ul role="list" className="divide-y divide-gray-200">
                            <li className="py-3 sm:py-4">
                                <div className="flex items-center space-x-4">
                                    <div className="flex-shrink-0">
                                    <Image src={user} height={30} width={30}/>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-900 truncate">
                                        Jack blanchard
                                        </p>
                                        <p className="text-sm text-gray-500 truncate">
                                        <a href="" className="__cf_email__" data-cfemail="17727a767e7b57607e7973646372653974787a">[Locataire]</a>
                                        </p>
                                    </div>
                                    <div className="inline-flex items-center text-base font-semibold text-gray-900">
                                        09/01/2022
                                    </div>
                                </div>
                            </li>
                            </ul>
                        </div>
                    </div>
                </div>
                </div>
            </main>
            <Footer/>
        </div>
    </div>
    </div>
</div>
    )
}
export default withAuth(index)