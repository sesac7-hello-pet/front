interface Props {
    onConfirm: () => void;
    onCancel: () => void;
}

export default function DeleteConfirmModal({ onConfirm, onCancel }: Props) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
            <div className="bg-white rounded p-6 space-y-4 shadow-lg">
                <p className="text-center text-sm">신청서를 삭제하시겠습니까?</p>
                <div className="flex justify-center space-x-4">
                    <button
                        onClick={onConfirm}
                        className="bg-amber-400 text-white px-4 py-1 rounded hover:bg-amber-500"
                    >
                        예
                    </button>
                    <button
                        onClick={onCancel}
                        className="bg-gray-200 text-gray-800 px-4 py-1 rounded hover:bg-gray-300"
                    >
                        아니오
                    </button>
                </div>
            </div>
        </div>
    );
}
