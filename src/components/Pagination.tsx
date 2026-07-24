import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import style from "./Pagination.module.css";

interface PaginationProps {
    page: number;
    length: number;
    setPage: (page: number) => void;
}

export function Pagination({ page, length, setPage }: PaginationProps) {
    function pageRange(page: number, length: number) {
        const arr = [];
        if (page <= length / 2) {
            for (let i = 1; i <= length; i++) {
                arr.push(i);
            }
        } else {
            for (
                let i = page - Math.floor(length / 2);
                i < page + Math.floor(length / 2);
                i++
            ) {
                arr.push(i);
            }
        }
        return arr;
    }

    return (
        <div className={style.pageRange}>
            <button
                className={style.iconBtn}
                onClick={() => {
                    if (page > 1) {
                        setPage(page - 1);
                    }
                }}
                hidden={page <= 1}
            >
                <FaAngleLeft />
            </button>
            {pageRange(page, length).map((p) => (
                <div
                    key={p}
                    onClick={() => setPage(p)}
                    style={{ marginInline: 2 }}
                >
                    {p == page ? <b>{p}</b> : p}
                </div>
            ))}
            <button className={style.iconBtn} onClick={() => setPage(page + 1)}>
                <FaAngleRight />
            </button>
        </div>
    );
}
