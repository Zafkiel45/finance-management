export const NavigationButtons = ({
    content,
    HandleOpenModal,

}:{content: string, HandleOpenModal?: any}) => {

    function HandleModalOpen() {
        if(HandleOpenModal) {
           HandleOpenModal(() => true);
           document.body.style.overflowY = 'hidden'
        };   
    };

    return (
        <button onClick={() => HandleModalOpen()} className="w-fit h-fit font-medium">
            {content}
        </button>
    )
}