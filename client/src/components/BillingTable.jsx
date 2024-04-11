import React from "react";
import PropTypes from "prop-types";

export const BillingTable = ({ data, handlerUpdate }) => {
  const deleteRow = async (id) => {
    //saving the object containing the index to remove
    let payload = JSON.stringify({ _id: id });

    const response = await fetch(`${window.ENVIRONMENT.api}/delete_data`, {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      method: "DELETE",
      body: payload, //sending the object to server with delete request
    });
    location.reload()
  };

  return (
    <>
      {data && (
        <div className="flex-item display-results">
          <h1>Purchase Data (Data for {data.username})</h1>
          <table className="table table-hover">
            <thead>
              <tr>
                <th>#</th>
                <th>Product Details</th>
                <th>Final Price</th>
                <th>Modify</th>
              </tr>
            </thead>
            <tbody id="table-body">
              {data.billingdata.map((dt, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <ul>
                      <li>Product Name: {dt.productName}</li>
                      <li>Purchase Date: {dt.purchaseDate}</li>
                      <li>Cost: ${dt.cost}</li>
                      <li>Quantity: {dt.quantity}</li>
                      <li>Category: {dt.category}</li>
                      <li>Description: {dt.description}</li>
                    </ul>
                  </td>
                  <td>
                    <ul>
                      <li>Total Price: ${dt.totalPrice}</li>
                      <li>Discount: %{dt.discount}</li>
                      <li>After Discount: ${dt.afterDiscount}</li>
                    </ul>
                  </td>
                  <td>
                    <button
                      aria-labelledby="deleteData"
                      data-index={dt._id}
                      id="deleteData"
                      className="submit-btn btn btn-outline-danger"
                      onClick={() => deleteRow(dt._id)}
                    >
                      DELETE
                    </button>
                    <button
                      type="button"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      className="show-popup submit-btn btn btn-outline-primary"
                      onClick={() => {
                        handlerUpdate(dt);
                      }}
                    >
                      UPDATE
                    </button>
                  </td>
                </tr>
              ))}
              <tr>
                <td>-</td>
                <td>Total Price: ${data.total}</td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

BillingTable.propTypes = {
  data: PropTypes.shape({
    username: PropTypes.string.isRequired,
    billingdata: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        productName: PropTypes.string.isRequired,
        purchaseDate: PropTypes.string.isRequired,
        cost: PropTypes.number.isRequired,
        quantity: PropTypes.number.isRequired,
        category: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        totalPrice: PropTypes.number.isRequired,
        discount: PropTypes.number.isRequired,
        afterDiscount: PropTypes.number.isRequired,
      })
    ).isRequired,
    total: PropTypes.number.isRequired,
  }),
};
