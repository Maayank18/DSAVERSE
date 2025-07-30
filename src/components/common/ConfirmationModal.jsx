import IconBtn from "./IconBtn"
import "./ConfirmationModal.css"

export default function ConfirmationModal({ modalData }) {
  return (
    <div className="confirmation-modal-overlay">
      <div className="confirmation-modal-box">
        <p className="confirmation-title">{modalData?.text1}</p>
        <p className="confirmation-subtext">{modalData?.text2}</p>
        <div className="confirmation-actions">
          <IconBtn
            onclick={modalData?.btn1Handler}
            text={modalData?.btn1Text}
          />
          <button
            className="confirmation-cancel-btn"
            onClick={modalData?.btn2Handler}
          >
            {modalData?.btn2Text}
          </button>
        </div>
      </div>
    </div>
  )
}
