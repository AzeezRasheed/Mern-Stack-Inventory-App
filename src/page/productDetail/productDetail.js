import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import DOMPurify from "dompurify";
import useRedirectLoggedOutUsers from "../../customHooks/useRedirectLoggedOutUsers";
import { getProduct } from "../../redux/product/productSlice";
import { selectIsLoggedIn } from "../../redux/auth/authSlice";
import Spinner from "../../components/spinnerModal/Spinner";
import { BsArrowRight } from "react-icons/bs";
function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  useRedirectLoggedOutUsers("/login");

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { product, isLoading, isError, message } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getProduct(id));
    }

    if (isError) {
      console.log(message);
    }
  }, [isLoggedIn, isError, message, dispatch]);

  const stockStatus = (quantity) => {
    if (quantity > 0) {
      return <span className="text-green-700">In Stock</span>;
    }
    return <span className="text-red-700">Out Of Stock</span>;
  };

  return (
    <div className="flex flex-col max-w-[500px] gap-2 shadow-lg shadow-indigo-500/50 bg-white p-2 lg:p-4">
      <h2 className="font-semi-bold text-[30px] font-serif text-center md:text-start lg:text-start ">
        Product Detail
      </h2>
      {isLoading && <Spinner />}
      <div className="flex flex-col gap ">
        {product?.image ? (
          <div className="image-preview transition flex items-center justify-center md:items-start md:justify-start lg:items-start lg:justify-start flex-wrap  py-3 mb-3 ">
            <img
              src={product?.image.filePath}
              alt={product?.image.name}
              className="max-w-full h-auto  shadow-lg"
            />
          </div>
        ) : (
          <p>No image set for this product.</p>
        )}

        <div className="flex flex-col lg:flex-row md:flex-row  gap-2 items-center">
          <label className=" uppercase  tracking-wide text-slate-700 font-semi-bold  ">
            Product Availability :
          </label>
          <p className="text-lg font-serif ">
            <b> {stockStatus(product?.quantity)} </b>
          </p>
        </div>
      </div>
      <hr className="text-[4px] font-bold  " />
      <div className="flex flex-col md:flex-row lg:flex-row  gap-2 items-center">
        <label className=" uppercase tracking-wide bg-yellow-400 text-white font-bold flex-shrink-0  text-sm border-4 py-1 px-2 rounded ">
          Name :
        </label>
        <p className="text-lg font-serif ">
          <b> {product?.name} </b>
        </p>
      </div>

      <div className="flex flex-row  gap-1 lg:gap-2 md:gap-2 items-center">
        <BsArrowRight />
        <label className="text-sm uppercase tracking-wide text-black font-bold  ">
          Category :
        </label>
        <p className="text-lg text-slate-600  ">
          <b> {product?.category} </b>
        </p>
      </div>

      <div className="flex flex-row  gap-1 lg:gap-2 md:gap-2 items-center">
        <BsArrowRight />
        <label className=" text-sm uppercase tracking-wide text-black font-bold  ">
          Price :
        </label>
        <p className="text-lg text-slate-600  ">
          <b>
            {" "}
            {"$"}
            {product?.price}{" "}
          </b>
        </p>
      </div>

      <div className="flex flex-row  gap-1 lg:gap-2 md:gap-2 items-center">
        <BsArrowRight />
        <label className=" uppercase text-sm tracking-wide text-black font-bold  ">
          Quantity in stock :
        </label>
        <p className="text-lg text-slate-600  ">
          <b> {product?.quantity} </b>
        </p>
      </div>

      <div className="flex flex-row  gap-1 lg:gap-2 md:gap-2 items-center">
        <BsArrowRight />
        <label className=" uppercase text-sm  tracking-wide text-black font-bold  ">
          Total value in stock :
        </label>
        <p className="text-lg text-slate-600  ">
          <b>
            {" "}
            {"$"}
            {product?.price * product?.quantity}{" "}
          </b>
        </p>
      </div>
      <hr className="text-[4px] font-bold  " />
      <div className="flex flex-col  gap-2">
        <div className="flex flex-row items-center gap-2">
          <BsArrowRight />
          <label className=" uppercase text-sm  tracking-wide text-black font-bold  ">
            Description :
          </label>
        </div>
        <div className=" bg-white">
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(product?.description),
            }}
          ></div>
        </div>
      </div>
      <hr className="text-[4px] font-bold   " />
      <div>
        <code className="--color-dark">
          Created on: {product?.createdAt.toLocaleString("en-US")}
        </code>
        <br />
        <code className="--color-dark">
          Last Updated: {product?.updatedAt.toLocaleString("en-US")}
        </code>
      </div>
    </div>
  );
}

export default ProductDetail;
