import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import UserServices from '../../../services/UserServices'
import { Formik, Form, ErrorMessage, Field, useFormik } from 'formik';
import { useGlobalFilter, useSortBy, useTable, usePagination, canPreviousPagen, canNextPage, useRowSelect, useRowState } from "react-table";
import AdminNavbar from '../../../src/components/core/Adminnavbar/AdminNavbar'
import SideBar from '../../../src/components/core/AdminSideBar/AdminSideBar'
import Footer from '../../../src/components/core/AdminFooter/AdminFooter'
import DateControl from "../../../src/components/ui/FormInputs/Datepicker"
import SwitchOption from "../../../src/components/ui/Switch/Switch"
import TextInput from "../../../src/components/ui/FormInputs/TextInput"
import { rolesOptions, userSexe } from "../../../utils/StaticData"
import styles from "../../../src/components/ui/FormInputs/formIputs.module.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as yup from "yup"
import moment from 'moment'
import withAuth from "../../../utils/withAuth";

function index() {

    // Define the states
    let [users, setUsers] = useState([])
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [status, setstatus] = useState(true)


    // Get ID
    const [useredit, setUserEdit] = useState({});

    // Regex to verify the phone number
    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;



        const editFormik = useFormik({
            initialValues: {
                Editid: null,
                Editroles: "",
                EditfirstName: "",
                EditlastName: "",
                EditbirthDay: "",
                Editsexe: "",
                Editphone: "",
                Editemail: "",
                EditisActive: true,
                Editpassword: "",
                EditconfirmPassword: "",
            },
            onSubmit: values =>  {
                //const song = e.target.getAttribute('firstName');
                //console.log('We need to get the details for ', song);
                console.log("MODIFIEED DATA => ", values)
                console.log("USER EDIT STATE => ", useredit)
                //const id = useredit[Object.keys(useredit)[0]].split('/')
                console.log("USER ID => ", useredit.id)
                axios.put(`/users/${useredit.id}`, useredit)
                .then(response => {
                    console.log(response);
                })
                .catch(error => {
                    console.log(error);
                });
                alert('modifier avec succee')


                /*console.log(values)

                const newUser = [...users]
                const formIndex = posts.formIndex(user => user.id === editUserId)
                console.log(formIndex)*/
            }
        }) 
        const formik = useFormik({
            initialValues: {
                id: null,
                roles: "",
                firstName: "",
                lastName: "",
                birthDay: "",
                sexe: "",
                phone: "",
                email: "",
                isActive: true,
                password: "",
                confirmPassword: "",
            },
            onSubmit: values  =>  {
                if(values.firstName == "" ||
                values.lastName == "" ||
                values.roles == "" ||
                values.birthDay == "" ||
                values.sexe == "" ||
                values.phone == "" ||
                values.email == "" ||
                values.password == "" ||
                values.confirmPassword == ""
                )
                {
                    toast.error("Vous devez remplir toutes les champs !", {theme: 'colored'});
                    return;
                }

                if (!values.email.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/))
                {
                    toast.error("L'adresse email n'est pas valid !", {theme: 'colored'});
                    return;
                }        

                if(!values.phone.match(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/))
                {
                    toast.error("Le numéro de télephone n'est pas valid !", {theme: 'colored'});
                    return;
                }

                if(!values.password.match(/^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/))
                {
                    toast.error("Le mot de passe doit contenir au moins 8 caractères, une majuscule, un chiffre et un caractère spécial !", {theme: 'colored'});
                    return;
                }

                if(values.confirmPassword != values.password)
                {
                    toast.error("Le mot de passe ne correspond pas !", {theme: 'colored'});
                    return;
                }

                let role = (values.roles == "admin"?"ROLE_ADMIN":(values.roles == "proprietaire")?"ROLE_PROP" :"ROLE_LOC")
                values.roles = role.split(" ");
                axios.post("/users", values)
                .then(function(response) {
                    console.log(response.data.message)
                    toast.success("Utilisateur ajoutée avec succée",{
                        theme: 'colored'
                    });
                    if(response.data.id != null)
                        values = Object.assign({'@id': "/api/users/" + response.data.id}, values);
                    setUsers([...users, values]);
                    setShowAddModal(false)
                  }).catch((err) => {
                        console.log(err.response.data["hydra:description"])
                        toast.error(err.response.data["hydra:description"] ,{theme: 'colored'});
                });

                // if there is a response and a data then success
                /*if(response && response.data) {
                    console.log(response.data.message)
                    toast.success("Utilisateur ajoutée avec succée",{
                        theme: 'colored'
                    });
                    setUsers(values);
                    setShowAddModal(false)
                }*/
                    //setUsers(newUsers)
                    //console.log(newUsers)*/
            }
        })
        console.log("UPDATE VALUES => " , editFormik.values)

        console.log("ADD VALUES => " , formik.values)

        // Getting id for edit and delete
        /*const [editUserId, seteditUserId] = useState(null);
        // Getting form Data
        const [editFormData, setEditFormData] = useState(
            {
                roles: "",
                firstName: "",
                lastName: "",
                birthDay: "",
                sexe: "",
                phone: "",
                email: "",
                password: "",
                confirmPassword: ""
            }
        )
*/
        // Initial Values of form
        /*const initialValues = {
            roles: "",
            firstName: "aaa",
            lastName: "",
            birthDay: "",
            sexe: "",
            phone: "",
            email: "",
            password: "",
            confirmPassword: "",
        };*/

        // Add user state
        /*const [addUser, setAddUser] = useState({
            roles: "",
            firstName: "",
            lastName: "",
            birthDay: "",
            sexe: "Homme",
            phone: "",
            email: "",
            password: "",
            confirmPassword: ""
        })*/


        // Edit Data value
        /*const handleEditChange = (input) => (e) => {
            e.preventDefault()
            setEditFormData({...editFormData, [input]: e.target.value})
        }*/

        // Handle inputs change
        /*const handleChange = (input) => (e)  => {
            e.preventDefault()
            setAddUser({...addUser, [input]: e.target.value})
            console.log(addUser)

        }*/

        // Handle add user click
        /*const handleAddUser = async (e) => {
            e.preventDefault()
            alert()
            console.log(formik.values)
        }*/


        //*************************************** Handling datatable */
        const getUsers = ()  => {
        axios.get('/users')
            .then( (response) => {
                const usersData = response.data['hydra:member'];
                setUsers(usersData);
                console.log("USER DATA => ", usersData);
            })
            .catch((error) => {
                console.log(`We have a server error`, error);
            });
        }

        // Create data Memo
        const usersData = useMemo(() =>
            [...users], [users]
        );

        //Columns Memo
        const usersColumns = useMemo(
            () =>
            users[0]
                ? Object.keys(users[0])
                    .filter((key) => key !== "birthDay")
                    .map((key) => {
                        let name ="";
                        switch (key) {
                            case "firstName":
                                name = "Nom"
                                break;
                                case "lastName":
                                name = "Prénom"
                                break;
                                case "lastName":
                                name = "Prénom"
                                break;
                                case "sexe":
                                name = "sexe"
                                break;
                                case "email":
                                name = "email"
                                break;
                                case "roles":
                                name = "role"
                                break;
                            default:
                                break;
                        }
                    return { Header: name, accessor: key };
                    })
                : [],
            [users]
        );

      // Adding action buttons to table
      

      const {
        getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, page, nextPage, previousPage, canNextPage, canPreviousPage, selectedFlatRows
      } = useTable(
        {
          columns: usersColumns,
          data: usersData,
          initialState: {
            pageIndex: 0,
            hiddenColumns: ['birthDay', '@type', '@id', 'id']
         },
        },
        useSortBy,
        usePagination,
        useRowSelect,
        hooks => {
            hooks.visibleColumns.push((columns) => [
              ...columns,
              {
                id: "Status",
                Header: "Status",
                Cell: ({ row }) => (
                    <div className={`${row.values.isActive === true ? "text-green-600" : "text-red-600"}`}>
                        { console.log(row.values.isActive)}
                        {row.values.isActive ? "Active" : "bloqué"}
                    </div>
                ),
              },
              {
                id: "Modifier",
                Header: "Modifier",
                Cell: ({ row }) => (
                    <div>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={() => { handleEdit(row.original)}}>
                            Modifier
                        </button>
                    </div>
                ),
              },
              {
                id: "Supprimer",
                Header: "Supprimer",
                Cell: ({ row }) => (
                    <div>
                        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full" onClick={() => { handleEdit(row.original)}}>
                            Supprimer
                        </button>
                    </div>
                ),
              },
            ]);
          }
        );
        
        const handleEdit = (row) => {
            console.log(row)
            setUserEdit(row)
            setShowEditModal(true)
            console.log("ROW data : ", row)
        }

        useEffect(getUsers, []);
    
    return (
            <div>
            <AdminNavbar/>
                <div className="flex overflow-hidden bg-white pt-16">
                <SideBar/>
                <div className="bg-gray-900 opacity-50 hidden fixed inset-0 z-10" id="sidebarBackdrop"></div>
                        <div id="main-content" className="h-full w-full bg-gray-50 relative overflow-y-auto lg:ml-64">
                            <main>
                            <div>
                            <button
                                className="m-10 bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={() => setShowAddModal(true)}>
                                Ajouter un utilisateur
                            </button>
                            </div>

                            
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
                            {showAddModal ? (
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
                                            Ajouter Un utilisateur
                                        </h3>
                                        <button
                                            className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                            onClick={() => setShowAddModal(false)}
                                        >
                                            <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                            ×
                                            </span>
                                        </button>
                                        </div>
                                        {/*body*/}
                                        <div className="relative p-6 flex-auto">
                                        <Formik key="add">
                                        <form key="add" onSubmit={formik.handleSubmit}>
                                            <div>
                                            <div className="grid md:grid-cols-3 sm:grid-cols-1 gap-10">
                                            <div>
                                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 text-left" htmlFor="firstName">Nom</label>
                                                <Field className={styles.flatInput} label="Nom" name="firstName" type="text" onChange={formik.handleChange} value={formik.values.firstName}/>
                                                <span className={styles.errorSpan}><ErrorMessage name="firstName" /></span>
                                            </div>
                                            <div>
                                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 text-left" htmlFor="lastName">Prénom</label>
                                                <Field className={styles.flatInput} label="Prénom"  name="lastName" type="text" onChange={formik.handleChange} value={formik.values.lastName}/>
                                                <span className={styles.errorSpan}><ErrorMessage name="lastName" /></span>
                                            </div>
                                            <div>
                                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 text-left" htmlFor="email">Email</label>
                                                <Field className={styles.flatInput} label="Email"  name="email" type="text" onChange={formik.handleChange} value={formik.values.email}/>
                                                <span className={styles.errorSpan}><ErrorMessage name="email" /></span>
                                            </div>
                                            <div>
                                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 text-left" htmlFor="sexe">Sexe</label>
                                                <Field className={styles.flatInput} as="select" name="sexe" onChange={formik.handleChange} value={formik.values.sexe}>
                                                                <option value="">Choisir votre sexe</option>
                                                                <option value="homme">Homme</option>
                                                                <option value="femme">Femme</option>
                                                </Field>
                                                <span className={styles.errorSpan}><ErrorMessage name="sexe" /></span>
                                            </div>
                                            <div>
                                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 text-left" htmlFor="roles">Role</label>
                                                <Field className={styles.flatInput} as="select" name="roles" onChange={formik.handleChange} value={formik.values.roles}>
                                                        <option value="">Choisir votre role</option>
                                                        <option value="admin">Admin</option>
                                                        <option value="proprietaire">Propriétaire</option>
                                                        <option value="locataire">Locataire</option>
                                                </Field>
                                                <span className={styles.errorSpan}><ErrorMessage name="roles" /></span>
                                            </div>
                                            <div>
                                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 text-left" htmlFor="birthDay">Date de naissance</label>
                                                <Field className={styles.flatInput} type="date" name="birthDay" className={styles.flatInput} onChange={formik.handleChange} value={formik.values.birthDay}/>
                                                <span className={styles.errorSpan}><ErrorMessage name="birthDay" /></span>
                                            </div>
                                            <div>
                                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 text-left" htmlFor="phone">Télephone</label>
                                                <Field className={styles.flatInput} label="Télephone"  name="phone" type="text" onChange={formik.handleChange} value={formik.values.phone}/>
                                                <span className={styles.errorSpan}><ErrorMessage name="phone" /></span>
                                            </div>
                                            <div>
                                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 text-left" htmlFor="password">mot de passe</label>
                                                <Field className={styles.flatInput} label="Mot de pass"  name="password" onChange={formik.handleChange} value={formik.values.password} type="password"/>
                                                <span className={styles.errorSpan}><ErrorMessage name="password" /></span>
                                            </div>
                                            <div>
                                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 text-left" htmlFor="confirmPassword">Confirmer le mot de passe</label>
                                                <Field type="password" className={styles.flatInput} label="Confirmer le mot de pass"  name="confirmPassword" onChange={formik.handleChange} value={formik.values.confirmPassword}/>                                                </div>
                                                <span className={styles.errorSpan}><ErrorMessage name="confirmPassword" /></span>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                        <button
                                            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="button"
                                            onClick={() =>{
                                                formik.resetForm()
                                                setShowAddModal(false)
                                            } }
                                        >
                                            Fermer
                                        </button>
                                        <button
                                            className="bg-blue-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="submit"
                                        >
                                        Ajouter
                                    </button>

                                            </div>
                                    </form>
                                    </Formik>
                                        
                            </div>
                        </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                    </>
                ) : null}
                            </div>


                            <div className="relative text-center">
                            {showEditModal ? (
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
                                            Modifier
                                        </h3>
                                        <button
                                            className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                            onClick={() => setShowEditModal(false)}
                                        >
                                            <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                            ×
                                            </span>
                                        </button>
                                        </div>
                                        {/*body*/}
                                        <div className="relative p-6 flex-auto">
                                        <Formik key="update">
                                        <form key="update" onSubmit={editFormik.handleSubmit}>
                                            <div>
                                            <div className="grid md:grid-cols-3 sm:grid-cols-1 gap-10">
                                            <div>
                                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 text-left" htmlFor="firstName">Nom</label>
                                                <Field id="EditfirstName" className={styles.flatInput} label="Nom" name="EditfirstName" type="text" onChange={editFormik.handleChange} value={editFormik.values.EditfirstName}/>
                                                <span className={styles.errorSpan}>{useredit.firstName}</span>
                                            </div>
                                            <div>
                                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 text-left" htmlFor="lastName">Prénom</label>
                                                <Field className={styles.flatInput} label="Prénom"  name="EditlastName" type="text" onChange={editFormik.handleChange} value={editFormik.values.EditlastName}/>
                                                <span className={styles.errorSpan}>{useredit.lastName}</span>
                                            </div>
                                            <div>
                                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 text-left" htmlFor="email">Email</label>
                                                <Field className={styles.flatInput} label="Email"  name="Editemail" type="text" onChange={editFormik.handleChange} value={editFormik.values.Editemail}/>
                                                <span className={styles.errorSpan}>{useredit.email}</span>
                                            </div>
                                            <div>
                                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 text-left" htmlFor="sexe">Sexe</label>
                                                <Field className={styles.flatInput} as="select" name="Editsexe" onChange={editFormik.handleChange} value={editFormik.values.Editsexe}>
                                                                <option value="homme">Homme</option>
                                                                <option value="femme">Femme</option>
                                                </Field>
                                                <span className={styles.errorSpan}>{useredit.sexe}</span>
                                            </div>
                                            <div>
                                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 text-left" htmlFor="roles">Role</label>
                                                <Field className={styles.flatInput} as="select" name="Editroles" onChange={editFormik.handleChange} value={editFormik.values.Editroles}>
                                                        <option value="admin">Admin</option>
                                                        <option value="prop">Propriétaire</option>
                                                        <option value="loc">Locataire</option>
                                                </Field>
                                                <span className={styles.errorSpan}>{useredit.roles}</span>
                                            </div>
                                            <div>
                                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 text-left" htmlFor="birthDay">Date de naissance</label>
                                                <Field className={styles.flatInput} type="date" name="EditbirthDay" className={styles.flatInput} onChange={editFormik.handleChange} value={editFormik.values.EditbirthDay}/>
                                                <span className={styles.errorSpan}>{useredit.birthDay}</span>
                                            </div>
                                            <div>
                                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 text-left" htmlFor="phone">Télephone</label>
                                                <Field className={styles.flatInput} label="Télephone"  name="Editphone" type="text" onChange={editFormik.handleChange} value={editFormik.values.Editphone}/>
                                                <span className={styles.errorSpan}>{useredit.phone}</span>
                                            </div>
                                            <div>
                                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 text-left" htmlFor="EditisActive">Status</label>
                                                <Field className={styles.flatInput} as="select" label="Status"  name="EditisActive" type="text" onChange={editFormik.handleChange} value={editFormik.values.EditisActive}>
                                                <option value="true">Active</option>
                                                <option value="false">Bloqué</option>
                                                /</Field>
                                                <span className={styles.errorSpan}>{useredit.phone}</span>
                                            </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                        <button
                                            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="button"
                                            onClick={() => {
                                                editFormik.resetForm()
                                                setShowEditModal(false)}}
                                        >
                                            Fermer
                                        </button>
                                        <button
                                            className="bg-blue-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="submit"
                                        >
                                        Modifier
                                    </button>

                                            </div>
                                    </form>
                                    </Formik>                                        
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
                        <ToastContainer />
            </div>

    )
}


export default index;