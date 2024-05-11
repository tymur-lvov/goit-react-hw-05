import s from "./NotFoundPage.module.css";

function NotFoundPage() {
  return (
    <div className={s.wrapper}>
      <span className={s.not_found}>404</span>
    </div>
  );
}

export default NotFoundPage;
