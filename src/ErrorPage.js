import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  if (error.status === 404) {
    return (
      <h1 className="text-center text-danger">صفحه مورد نظر شما یافت نشد</h1>
    );
  } else {
    return (
      <div className="ErrorPage">
        <h1 className="text-danger text-center">
          با خطا مواجه شدید
          <br />
          Error {error.status} {error.statusText}
        </h1>
      </div>
    );
  }
}
