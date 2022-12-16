import React, { useEffect, useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { AiOutlineEye } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { deleteProduct, getProducts } from "../../redux/product/productSlice";
import { Link } from "react-router-dom";
import { selectFilteredProducts } from "../../redux/product/filterSlice";
import { FILTER_PRODUCTS } from "../../redux/product/filterSlice";
import { selectInputBoolean } from "../../redux/inputBoolean/inputBooleanSlice";
import Spinner from "../../components/spinnerModal/Spinner";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
const ProductList = ({ products, isLoading }) => {
  const [search, setSearch] = useState("");
  const filteredProducts = useSelector(selectFilteredProducts);
  const dispatch = useDispatch();

  const inputBoolean = useSelector(selectInputBoolean);
  const shortenWord = (name, num) => {
    if (name.length > num) {
      const shortenText = name.substring(0, num).concat("...");
      return shortenText;
    }
    return name;
  };

  //   Begin Pagination
  const [currentProducts, setCurrentProducts] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [pageOffset, setPageOffset] = useState(0);
  const productsPerPage = 5;

  useEffect(() => {
    const endOffset = pageOffset + productsPerPage;
    setCurrentProducts(filteredProducts.slice(pageOffset, endOffset));
    setPageCount(Math.ceil(filteredProducts.length / productsPerPage));
  }, [pageOffset, productsPerPage, filteredProducts]);

  const handlePageClick = (event) => {
    const newOffset =
      (event.selected * productsPerPage) % filteredProducts.length;
    setPageOffset(newOffset);
  };
  //   End Pagination

  const confirmDelete = (id) => {
    confirmAlert({
      title: "Delete Product",
      message: "Are you sure you want to delete this product.",
      buttons: [
        {
          label: "Delete",
          onClick: () => delProduct(id),
        },
        {
          label: "Cancel",
          // onClick: () => alert('Click No')
        },
      ],
    });
  };

  const delProduct = async (id) => {
    await dispatch(deleteProduct(id));
    await dispatch(getProducts());
  };

  useEffect(() => {
    dispatch(FILTER_PRODUCTS({ products, search }));
  }, [products, dispatch, search]);

  return (
    <div className="flex flex-col gap-2 ">
  
      <div className="max-w-xs">
        <label
          htmlFor="default-search"
          className="mb-2  text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>

        <div className={`relative  ${inputBoolean ? "-z-10 " : ""}`}>
          <div className="absolute z-0 inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className="block  w-full p-3 pl-10  text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search by name"
            required
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {isLoading && <Spinner />}
      <div className="overflow-x-auto md:w-[500px] lg:w-full ">
        {isLoading && products.length === 0 ? (
          <>
            <p>-- No product found, please add a product...</p>
          </>
        ) : (
          <>
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th className="py-3 px-6">s/n</th>
                  <th scope="col" className="py-3 px-6">
                    Name
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Category
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Price
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Quantity
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Value
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentProducts.map((product, index) => {
                  return (
                    <tr
                      key={product._id}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    >
                      <td className="py-4 px-6"> {index + 1}</td>
                      <th
                        scope="row"
                        className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {shortenWord(product.name, 16)}
                      </th>
                      <td className="py-4 px-6">{product.category}</td>
                      <td className="py-4 px-6">${product.price} </td>
                      <td className="py-4 px-12"> ${product.quantity}</td>
                      <td className="py-4 px-6">{product.value}</td>

                      <td className="flex flex-row gap-2 items-center py-4 px-2">
                        <span className="cursor-pointer">
                          <Link to={`/product-detail/${product._id}`}>
                            <AiOutlineEye size={25} color={"purple"} />
                          </Link>
                        </span>
                        <span className="cursor-pointer">
                          <Link to={`/edit-product/${product._id}`}>
                            <FaEdit size={20} color={"green"} />
                          </Link>
                        </span>
                        <span className="cursor-pointer">
                          <FaTrashAlt
                            size={20}
                            color={"red"}
                            onClick={() => {
                              confirmDelete(product._id);
                            }}
                          />
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </>
        )}
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          padding: 20,
        }}
      >
        <ReactPaginate
          className="flex flex-row gap-10 items-center font-serif text-[20px] text-center "
          breakLabel="..."
          previousLabel={<GoArrowLeft className="text-[30px] " />}
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={pageCount}
          nextLabel={<GoArrowRight className="text-[30px] " />}
          renderOnZeroPageCount={null}
          containerClassName="pagination"
          pageLinkClassName="page-num"
          previousLinkClassName="page-num"
          nextLinkClassName="page-num"
          activeLinkClassName="activePage"
        />
      </div>
    </div>
  );
};

export default ProductList;
