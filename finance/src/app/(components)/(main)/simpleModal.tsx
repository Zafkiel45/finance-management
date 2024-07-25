import { Dispatch, SetStateAction } from "react";
import CloseSVG from "../../../../public/svg/close";

interface TypeArg {
  content: string;
  state: boolean;
  handleFunction: Dispatch<SetStateAction<boolean>>;
  placeholder: string;
  inputType: string;
}

export const SimpleModal = ({
  content,
  state,
  handleFunction,
  placeholder,
  inputType,
}: TypeArg) => {
  let checkStateOfModal: string = state ? "flex" : "hidden";

  function HandleCloseModal() {
    handleFunction(() => false);
  }

  return (
    <div
      className={`${checkStateOfModal} w-screen h-screen flex transition-opacity backdrop-blur-sm  items-center justify-center top-0 left-0 fixed`}
    >
      {/* overlay acima*/}
      {/* Modal abaixo*/}
      <div
        className={`bg-white dark:bg-[#111111] border border-[#414141] shadow-sm rounded-lg gap-5 flex flex-col justify-center w-fit h-fit py-3 px-5`}
      >
        {/* label e close button container */}
        <div className="w-full h-fit flex justify-between items-center">
          <div>{content}</div>
          <div>
            <CloseSVG onClick={() => HandleCloseModal()} />
          </div>
        </div>
        {/* input container */}
        <div className="w-full h-fit">
          <input
            type={inputType}
            placeholder={placeholder}
            className="shadow-md bg-white dark:bg-[#111111] rounded-lg px-2 py-1 border border-gray-500 placeholder:text-gray-400 placeholder:text-sm"
          />
        </div>
        {/* button container */}
        <div className="self-end">
          <button className="bg-[#003362] text-[#eee] py-1 px-2 rounded-md text-sm border-2 border-[#205D9E]">
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};
