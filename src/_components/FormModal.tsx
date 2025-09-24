"use client";

import { Music2 } from "lucide-react";
import SearchForm from "./SearchForm";

export default function FormModal() {
  const openFormModal = () => {
    const modal = document.getElementById(
      "form_modal"
    ) as HTMLDialogElement | null;
    if (modal) modal.showModal();
  };

  return (
    <>
      <button
        className="btn rounded-full flex items-center"
        onClick={openFormModal}
      >
        <Music2 />
        Search
      </button>

      <dialog id="form_modal" className="modal">
        <div className="modal-box max-w-md">
          <h3 className="font-bold text-lg mb-4">Search & Translate</h3>
          <SearchForm />
          <div className="modal-action">
            <form method="dialog">
              <button className="btn rounded-full">Close</button>
            </form>
          </div>
        </div>

        {/* WHY. This is needed here to be able to close the form when click outside */}
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
