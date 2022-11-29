interface Props {
  btnName: string;
  mid?: boolean;
  responsive?: boolean;
  [key: string]: any;
}
import { cls } from "lib/util";
export default function Button({ btnName, mid, responsive, onClick }: Props) {
  return (
    <>
      {responsive ? (
        <div
          className={cls(
            "text-white text-base bg-[#1d9bf0] hover:bg-[#1a8cd8] focus:ring-4 focus:ring-blue-300 font-bold sm:w-full sm:h-full sm:rounded-[100px] text-center  cursor-pointer",
            mid ? "py-4" : "py-2 px-6",
            "w-12 h-12 rounded-full"
          )}
          onClick={onClick}
        >
          <div className="flex items-center justify-center">
            <div className="sm:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" width="20" height="20">
                <g fill="#FFFFFF">
                  <path
                    d="M23 3c-6.62-.1-10.38 2.421-13.05 6.03C7.29 12.61 6 17.331 6 22h2c0-1.007.07-2.012.19-3H12c4.1 0 7.48-3.082 7.94-7.054C22.79 10.147 23.17 6.359 23 3zm-7 8h-1.5v2H16c.63-.016 1.2-.08 1.72-.188C16.95 15.24 14.68 17 12 17H8.55c.57-2.512 1.57-4.851 3-6.78 2.16-2.912 5.29-4.911 9.45-5.187C20.95 8.079 19.9 11 16 11zM4 9V6H1V4h3V1h2v3h3v2H6v3H4z"
                    fill="#FFFFFF"
                  ></path>
                </g>
              </svg>
            </div>
            <button className="hidden sm:block">{btnName}</button>
          </div>
        </div>
      ) : (
        <div
          className={cls(
            "text-white text-base my-2 bg-[#1d9bf0] hover:bg-[#1a8cd8] focus:ring-4 focus:ring-blue-300 font-bold rounded-[100px] text-center  cursor-pointer",
            mid ? "py-4" : "py-2 px-6"
          )}
        >
          <button>{btnName}</button>
        </div>
      )}
    </>
  );
}
