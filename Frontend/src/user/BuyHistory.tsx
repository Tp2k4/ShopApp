import Header from "../shared/components/ui/Header";
import Box from "../shared/components/ui/Box";
import Items from "../shared/components/list/Items";

function BuyHistory() {
  return (
    <div className="h-screen w-screen flex flex-col items-center gap-[var(--medium-gap)]">
        <Header role="User" />
        <Box className="p-[var(--medium-gap)]" width="75%" height="100%">
            <Items/>
        </Box>
    </div>
  );
}

export default BuyHistory; 
