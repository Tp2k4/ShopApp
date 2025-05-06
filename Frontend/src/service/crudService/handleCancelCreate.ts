export const handleCancelCreate = (
    setShowPopup: React.Dispatch<React.SetStateAction<boolean>>,
    setNewItem: React.Dispatch<React.SetStateAction<any>>
) => {  
    
    setShowPopup(false);
    
    // set tất cả các trường về mặt định ""
    setNewItem((prevOrder: any) => {
        const resetOrder: any = {};
        for (const key in prevOrder) {
          if (Object.prototype.hasOwnProperty.call(prevOrder, key)) {
            resetOrder[key] = "";
          }
        }
        return resetOrder;
    });
}