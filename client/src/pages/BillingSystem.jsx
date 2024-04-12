import React, { useEffect, useState, useRef } from "react";
import { BillingTable } from "../components/BillingTable";
import { checkAuthentication } from "../components/auth";
import { NavComponent } from "../components/NavComponent";
import { Notification } from "../components/Notification";

export const BillingSystemPage = () => {
    const [error, setError] = useState(null);

    const handleNotification = (message) => {
        if (message) setError(message);
    };
    const [data, setData] = useState({});
    const initialState = {
        productName: "",
        purchaseDate: null,
        cost: 0,
        quantity: 0,
        category: "",
        description: "",
        githubId: "",
        _id: "",
    };
    const [billingFormData, setBillingFormData] = useState(initialState);
    const [initialFormData, setInitialFormData] = useState(initialState);
    const [submitted, setSubmitted] = useState(false); // State to track submission
    const token = localStorage.getItem("token");
    useEffect(() => {
        const fetchBillingData = async () => {
            try {
                const isAuth = await checkAuthentication();

                if (!isAuth) window.location.href = "/";

                const response = await fetch(
                    `${window.ENVIRONMENT.api}/billingsystem`,
                    {
                        method: "GET",
                        mode: "cors",
                        credentials: "include",
                        headers: {

                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                const jsonData = await response.json();

                setData(jsonData);
            } catch (e) {
                handleNotification("Fail to fetch data.");
            }
        };

        fetchBillingData();
    }, [submitted]);

    const handlerUpdate = (e, data) => {
        e.preventDefault();
        e.stopPropagation();
        const dt = new Date(data.purchaseDate);
        const month = dt.getMonth() + 1;
        const date = dt.getDate();
        const year = dt.getFullYear();
        data.purchaseDate = `${year}-${month.toString().padStart(2, "0")}-${date
            .toString()
            .padStart(2, "0")}`;
        setBillingFormData(data);
        setInitialFormData(data);
    };
    const handleSubmit = (e) => {
        e.preventDefault();

        const data = Array.from(e.target.elements)
            .filter((input) => input.name)
            .reduce(
                (obj, input) => Object.assign(obj, { [input.name]: input.value }),
                {}
            );

        fetch(`${window.ENVIRONMENT.api}/add-data`, {
            method: "POST",
            credentials: "include",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        })
            .then((response) => {
                if (response.status !== 200) {
                    throw new Error(response.statusText);
                }

                return response.json();
            })
            .then(() => {

                setSubmitted(!submitted);
                console.log("success");
            })
            .catch((err) => {
                console.log(err.toString());

            });
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const finalFormEndpoint = e.target.action;

        const data = Array.from(e.target.elements)
            .filter((input) => input.name)
            .reduce(
                (obj, input) => Object.assign(obj, { [input.name]: input.value }),
                {}
            );
        fetch(`${window.ENVIRONMENT.api}/update_data`, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            credentials: "include",
            body: JSON.stringify(data),
        })
            .then((response) => {
                if (response.status !== 200) {
                    throw new Error(response.statusText);
                }

                return response.json();
            })
            .then(() => {

                setSubmitted(!submitted);
                formRef.current;
            })
            .catch((err) => {
                console.log(err.toString());

            });
    };
    const formRef = useRef(null);
    const handleReset = () => {
        setBillingFormData(initialFormData);
    };

    return (
        <>
            (
            <>
                {
                    <>
                        <Notification message={error} type="danger"></Notification>
                        <NavComponent></NavComponent>
                        <div className="apply-translation">
                            <div className="flex-container">
                                <div className="flex-item inside-form">
                                    <h2>Add Purchase Data</h2>
                                    <form onSubmit={handleSubmit} method="POST">
                                        <label htmlFor="productname">Product Name</label>
                                        <br />
                                        <input
                                            autoFocus="true"
                                            autoComplete="off"
                                            type="text"
                                            name="productName"
                                            id="productname"
                                            placeholder="Enter product name"
                                            required
                                        />
                                        <br />
                                        <label htmlFor="purchasedate">Date Of Purchase</label>
                                        <input
                                            autoComplete="off"
                                            type="date"
                                            id="purchasedate"
                                            name="purchaseDate"
                                            required
                                        />
                                        <br />
                                        <label htmlFor="cost">Product Cost</label>
                                        <input
                                            autoComplete="off"
                                            type="number"
                                            id="cost"
                                            name="cost"
                                            placeholder="Enter cost for single"
                                            required
                                        />
                                        <br />
                                        <label htmlFor="quantity">Product Quantity</label>
                                        <input
                                            autoComplete="off"
                                            type="number"
                                            id="quantity"
                                            name="quantity"
                                            placeholder="Enter quantity"
                                            required
                                        />
                                        <br />
                                        <label htmlFor="category">Product Category</label>
                                        <br />
                                        <select id="category" name="category">
                                            <option disabled selected>
                                                Choose Category
                                            </option>
                                            <option value="food">Food</option>
                                            <option value="electronics">Electronics</option>
                                            <option value="furniture">Furniture</option>
                                            <option value="clothing">Clothing</option>
                                            <option value="kitchen">Kitchen</option>
                                            <option value="living-bedroom">
                                                Living/Bedroom space
                                            </option>
                                            <option value="other">Other</option>
                                        </select>
                                        <br />
                                        <label htmlFor="description">Product Description</label>
                                        <br />
                                        <input
                                            autoComplete="off"
                                            type="text"
                                            id="description"
                                            name="description"
                                            placeholder="Enter any product description"
                                            required
                                        />
                                        <input type="hidden" value={data.id} name="githubId" />
                                        <br />
                                        <button
                                            type="submit"
                                            id="submit"
                                            className="btn btn-primary submit-btn"
                                        >
                                            SUBMIT
                                        </button>
                                        <button type="reset" className="btn btn-primary submit-btn">
                                            RESET
                                        </button>
                                    </form>
                                </div>
                                {data.billingdata && data.billingdata.length > 0 ? (
                                    <BillingTable data={data} handlerUpdate={handlerUpdate} />
                                ) : (
                                    <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="d-none">
                                            <symbol id="info-fill" viewBox="0 0 16 16">
                                                <path
                                                    d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
                                            </symbol>
                                        </svg>
                                        <div className="alert alert-primary d-flex align-items-center" role="alert">
                                            <svg className="bi flex-shrink-0 me-2" role="img" aria-label="Info:">
                                                <use xlinkHref="#info-fill"/>
                                            </svg>
                                            <div>
                                                You have not created any purchase data
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        {billingFormData && billingFormData._id && (
                            <div
                                className="modal"
                                id="exampleModal"
                                tabIndex="-1"
                                role="dialog"
                                aria-labelledby="exampleModalLabel"
                                aria-hidden="true"
                            >
                                <div className="modal-dialog modal-lg" role="document">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="exampleModalLabel">
                                                Update
                                            </h5>
                                        </div>
                                        <div className="modal-body">
                                            <div className="modal-body-form">
                                                <form onSubmit={handleUpdate} ref={formRef}>
                                                    <input type="hidden" name="_method" value="PUT" />
                                                    <label htmlFor="updproductname">Product Name</label>
                                                    <br />
                                                    <input
                                                        value={billingFormData.productName}
                                                        autoComplete="off"
                                                        type="text"
                                                        id="updproductname"
                                                        name="productName"
                                                        placeholder="Enter product name"
                                                        required
                                                        onChange={(e) => {
                                                            setBillingFormData({
                                                                ...billingFormData,
                                                                productName: e.target.value,
                                                            });
                                                        }}
                                                    />
                                                    <br />
                                                    <label htmlFor="updpurchasedate">
                                                        Date Of Purchase
                                                    </label>
                                                    <input
                                                        value={billingFormData.purchaseDate}
                                                        aria-label="purchase-date"
                                                        autoComplete="off"
                                                        type="date"
                                                        id="updpurchasedate"
                                                        name="purchaseDate"
                                                        required
                                                        onChange={(e) => {
                                                            setBillingFormData({
                                                                ...billingFormData,
                                                                purchaseDate: e.target.value,
                                                            });
                                                        }}
                                                    />
                                                    <br />
                                                    <label htmlFor="updcost">Product Cost</label>
                                                    <input
                                                        value={billingFormData.cost}
                                                        autoComplete="off"
                                                        type="number"
                                                        id="updcost"
                                                        name="cost"
                                                        placeholder="Enter cost for single"
                                                        required
                                                        onChange={(e) => {
                                                            setBillingFormData({
                                                                ...billingFormData,
                                                                cost: e.target.value,
                                                            });
                                                        }}
                                                    />
                                                    <br />
                                                    <label htmlFor="updquantity">Product Quantity</label>
                                                    <input
                                                        value={billingFormData.quantity}
                                                        autoComplete="off"
                                                        type="number"
                                                        id="updquantity"
                                                        name="quantity"
                                                        placeholder="Enter quantity"
                                                        required
                                                        onChange={(e) => {
                                                            setBillingFormData({
                                                                ...billingFormData,
                                                                quantity: e.target.value,
                                                            });
                                                        }}
                                                    />
                                                    <br />
                                                    <label htmlFor="updcategory">Product Category</label>
                                                    <br />
                                                    <select
                                                        value={billingFormData.category}
                                                        id="updcategory"
                                                        name="category"
                                                        aria-label="category"
                                                        onChange={(e) => {
                                                            setBillingFormData({
                                                                ...billingFormData,
                                                                category: e.target.value,
                                                            });
                                                        }}
                                                    >
                                                        <option disabled defaultValue>
                                                            Choose Category
                                                        </option>
                                                        <option value="food">Food</option>
                                                        <option value="electronics">Electronics</option>
                                                        <option value="furniture">Furniture</option>
                                                        <option value="clothing">Clothing</option>
                                                        <option value="kitchen">Kitchen</option>
                                                        <option value="living-bedroom">
                                                            Living/Bedroom space
                                                        </option>
                                                        <option value="other">Other</option>
                                                    </select>
                                                    <br />
                                                    <label htmlFor="upddescription">
                                                        Product Description
                                                    </label>
                                                    <br />
                                                    <input
                                                        value={billingFormData.description}
                                                        autoComplete="off"
                                                        type="text"
                                                        id="upddescription"
                                                        name="description"
                                                        placeholder="Enter any product description"
                                                        required
                                                        onChange={(e) => {
                                                            setBillingFormData({
                                                                ...billingFormData,
                                                                description: e.target.value,
                                                            });
                                                        }}
                                                    />
                                                    <br />
                                                    <input
                                                        value={billingFormData.githubId}
                                                        type="hidden"
                                                        id="githubid"
                                                        name="githubId"
                                                        readOnly={true}
                                                    />

                                                    <input
                                                        value={billingFormData._id}
                                                        type="hidden"
                                                        id="updindex"
                                                        name="_id"
                                                        readOnly="true"
                                                    />

                                                    <div className="modal-footer">
                                                        <button
                                                            type="button"
                                                            className="btn btn-secondary btn-sm"
                                                            data-bs-dismiss="modal"
                                                        >
                                                            CANCEL
                                                        </button>
                                                        <button
                                                            type="submit"
                                                            className="btn btn-success btn-sm"
                                                            id="updsubmit"
                                                            data-bs-dismiss="modal"
                                                        >
                                                            UPDATE
                                                        </button>
                                                        <button
                                                            type="reset"
                                                            className="btn btn-primary btn-sm"
                                                            id="reset"
                                                            onClick={handleReset}
                                                        >
                                                            RESET
                                                        </button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
                }
            </>
            )
        </>
    );
};