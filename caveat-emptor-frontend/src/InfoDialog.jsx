import './App.css';
import {Button, Dialog, DialogContent, DialogTitle, Typography} from '@mui/material';

const InfoDialog = props => <>
  <Dialog open={props.open}>
    <DialogTitle>What is Caveat Emptor?</DialogTitle>
    <DialogContent>
      <Typography variant="p">
        Caveat Emptor, based on the Latin idiom "Let the buyer beware", is an
        automated, open-source, cryptocurrency smart contract auditing software.
        That's a lot of big words. Essentially, this program is used to
        automatically analyze a cryptocurrency's smart contract (ie. its code)
        and return some of its important parts to you.
      </Typography><br/><br/>
      <Typography variant="p">
        Simply copy-pase the Ethereum address of a cryptocurrency into the
        search bar, and click the search button. This software will then grab
        the cryptocurrency's smart contract and parse out all of that contract's
        contracts, looking for any modifiers and how they are used. Try it out
        with NIL Coin: 0x0eb638648207d00b9025684d13b1cb53806debe4.
      </Typography><br/><br/>
      <Typography variant="p">
        What's a modifier? A modifier is a certain condition that must be passed
        before something happens with the cryptocurrency. Let's say that for
        example, a certain cryptocurrency could have an owner. It could then use
        a modifier "onlyOwner" that checks whether the person trying to do
        something with the cryptocurrency is the owner. If so, then it will run
        whatever it is that the owner is trying to do. Otherwise, it will stop.
        So, if the owner wanted to designate some function to empty one wallet's
        contents into their own, they could create a function called
        "transferOwnership" and give it the onlyOwner modifier. Then, only the
        owner can run this transferOwnership function.
      </Typography><br/><br/>
      <Typography variant="p">
        When you look up a smart contract, each of its own contracts that have a
        modifier get listed below the search bar. Each contract has its own
        modifiers, each of which will show up in their own separate box
        underneath their respective contract. Then, each function that uses that
        modifier is listed within that box, using multiple pages if necessary.
        If you want to read the code of that modifier or function, simply click
        the function's name and its code will appear below. Not enough space to
        read the function? Click the expand button in the bottom left corner of
        the modifier box and the modifier will expand to take up the full width
        of the page. You can shrink it back to its original size by clicking
        that button again.
      </Typography><br/><br/>
      <Button
        color="primary"
        variant="contained"
        onClick={e => props.toggleInfo()}>Return</Button>
    </DialogContent>
  </Dialog>
</>;

export default InfoDialog;