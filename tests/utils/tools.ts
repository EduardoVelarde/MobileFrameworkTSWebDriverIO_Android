export async function tools() {
  const swipeDownUntilElmentIsDisplay = (context,timer)=>{
    const maxTime= timeZone.current+timer;
    while(timeZone.current>maxTime){
        if(context.isDisplayed){
            break;
        }
        Logic swipe down
    }
  }

  }
}