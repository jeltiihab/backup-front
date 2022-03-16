import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import AdminNavbar from '../../../src/components/core/Adminnavbar/AdminNavbar'
import SideBar from '../../../src/components/core/AdminSideBar/AdminSideBar'
import Footer from '../../../src/components/core/AdminFooter/AdminFooter'
import { Formik, Form, ErrorMessage, Field, useFormik } from 'formik';
import { useGlobalFilter, useSortBy, useTable, usePagination, canPreviousPagen, canNextPage, useRowSelect, useRowState } from "react-table";
import styles from "../../../src/components/ui/FormInputs/formIputs.module.css"
import GlobalFilter from '../../../utils/datatableGlobalFilter'

export default function index() {

    const [propertyInfo, setPropertyInfo] = useState([])
    const [properties, setProperties] = useState([])
    const [showInfoModal, setShowInfoModal] = useState(false);

    const handleInfo = (values) => {
        setShowInfoModal(true)
        setPropertyInfo(values)
        console.log(values)
    }

            //*************************************** Handling datatable */
            const getProperties = ()  => {
                axios.get('/properties')
                    .then( (response) => {
                        const propertiesData = response.data['hydra:member'];
                        setProperties(propertiesData);
                        console.log("PROPERTIES DATA => ", propertiesData);
                    })
                    .catch((error) => {
                        console.log(`We have a server error`, error);
                    });
                }
        
                // Create data Memo
                const propertiesData = useMemo(() =>
                    [...properties], [properties]
                );
        
            // Columns Memo
                const propertiesColumns = useMemo(
                    () =>
                    properties[0]
                        ? Object.keys(properties[0])
                            .filter((key) => key !== "birthDay")
                            .map((key) => {
                                let name ="";
                                switch (key) {
                                    case "name":
                                        name = "Nom"
                                        break;
                                        case "hostingCapacity":
                                        name = "Max Voyageurs"
                                        break;
                                        case "rooms":
                                        name = "Chambres"
                                        break;
                                        case "surface":
                                        name = "Surface"
                                        break;
                                        case "reviews":
                                        name = "Nombre d'avis"
                                        break;
                                    default:
                                        break;
                                }
                            return { Header: name, accessor: key };
                            })
                        : [],
                    [properties]
                );
        
              // Adding action buttons to table
              
        
              const {
                getTableProps, getTableBodyProps, state, setGlobalFilter, headerGroups, rows, prepareRow, page, nextPage, previousPage, canNextPage, canPreviousPage, selectedFlatRows
              } = useTable(
                {
                  columns: propertiesColumns,
                  data: propertiesData,
                  initialState: {
                    pageIndex: 0,
                    hiddenColumns: ['@type', '@id', 'id', 'location', 'description', 'adress_idAdress', 'owner_idUser', 'rate']
                 },
                },
                useGlobalFilter,
                useSortBy,
                usePagination,
                useRowSelect,
                hooks => {
                    hooks.visibleColumns.push((columns) => [
                      ...columns,
                      {
                        id: "infos",
                        Header: "Informations",
                        Cell: ({ row }) => (
                            <div>
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={() => { handleInfo(row.original)}}>
                                    +
                                </button>
                            </div>
                        ),
                      },
                    ]);
                  }
                );
                useEffect(getProperties, []);
                const {globalFilter} = state

    return (
        <div>
        <AdminNavbar/>
            <div className="flex overflow-hidden bg-white pt-16">
                <SideBar/>
            <div className="bg-gray-900 opacity-50 hidden fixed inset-0 z-10" id="sidebarBackdrop"></div>
                    <div id="main-content" className="h-full w-full bg-gray-50 relative overflow-y-auto lg:ml-64">
                        <main>
                        <span>
                            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter}/>
                        </span>
                        <table {...getTableProps()} className="min-w-full leading-normal m-10">
                                    <thead>
                                        {headerGroups.map((headerGroup) => (
                                            <tr {...headerGroup.getHeaderGroupProps()}>
                                            {headerGroup.headers.map((column) => (
                                                <th {...column.getHeaderProps(column.getSortByToggleProps())} className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                {column.render("Header")}
                                                {column.isSorted ? (column.isSortedDesc ? " ▼" : " ▲") : ""}
                                                </th>
                                            ))}
                                            </tr>
                                        ))}
                                    </thead>
                                    <tbody {...getTableBodyProps()}>
                                        {page.map((row, idx) => {
                                            prepareRow(row);
                                            return (
                                            <tr {...row.getRowProps()}>
                                                {row.cells.map((cell, idx) => (
                                                <td {...cell.getCellProps()} className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    {cell.render("Cell")}
                                                </td>
                                                ))}
                                            </tr>
                                            );
                                        })}
                                    </tbody>
                            </table>
                            <div className="relative text-center">
                                <button disabled={!canPreviousPage} onClick={() => previousPage()} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l">
                                    Prev
                                </button>
                                <button disabled={!canNextPage} onClick={() => nextPage()} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r">
                                    Next
                                </button>
                            </div>

                            <div className="relative text-center">
                            {showInfoModal ? (
                                <>
                                <div
                                    className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                                >
                                    <div className="relative w-auto my-6 mx-auto max-w-3xl">
                                    {/*content*/}
                                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                        {/*header*/}
                                        <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                                        <h3 className="text-3xl font-semibold">
                                        {propertyInfo.name}
                                        </h3>
                                        <button
                                            className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                            onClick={() => setShowInfoModal(false)}
                                        >
                                            <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                            ×
                                            </span>
                                        </button>
                                        </div>
                                        {/*body*/}
                                        <div className="relative p-6 flex-auto">
                                        <button
                                            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="button"
                                            onClick={() =>{
                                                setShowInfoModal(false)
                                            } }
                                        >
                                            Fermer
                                        </button>
                                        
                                        </div>
                                    </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                    </>
                ) : null}
                            </div>
                        </main>
                        <Footer/>
                    </div>
            </div>
        </div>
            
        
    )
}
