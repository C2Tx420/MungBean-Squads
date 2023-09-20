import AddVault from "../../components/add-vault";
import ContentBox from "../../components/content-box";
import PocketItem from "../../components/pocket-item";
import './styles.scss';


export default function Pockets() {
  return (
    <div className="pockets">
      <div className="pockets__heading">
        <h2 className="pocket__heading-Title">Pockets</h2>
        <AddVault />
      </div>
      <ContentBox>
        <div className="pockets__list">
          <PocketItem />
          <PocketItem />
          <PocketItem />
          <PocketItem />
          <PocketItem />
          <PocketItem />
          <PocketItem />
          <PocketItem />
          <PocketItem />
          <PocketItem />
          <PocketItem />
          <PocketItem />
          <PocketItem />
          <PocketItem />
        </div>
      </ContentBox>
    </div>
  )
}
