import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductList from "../../components/Product/ProductList";
import ProductSummary from "../../components/Product/ProductSummary";
import useRedirectLoggedOutUsers from "../../customHooks/useRedirectLoggedOutUsers";
import { selectIsLoggedIn } from "../../redux/auth/authSlice";
import { getProducts } from "../../redux/product/productSlice";

const Dashboard = () => {
  useRedirectLoggedOutUsers("/login");
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { products, isLoading, isError, message } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getProducts());
    }

    if (isError) {
      console.log(message);
    }
  }, [isLoggedIn, isError, message, dispatch]);

  return (
    <div>
      <ProductList products={products} isLoading={isLoading} />
      <ProductSummary />
    </div>
  );
};

export default Dashboard;
