import ContentBox from "../../components/content-box";
import PocketItem from "../../components/pocket-item";
import './styles.scss';


export default function Pockets() {
  return (
    <div className="pockets">
      <h2 className="pockets__title">Pockets</h2>
      <ContentBox>
        <div className="pockets__list">
          <PocketItem/>
          <PocketItem/>
          <PocketItem/>
          <PocketItem/>
          <PocketItem/>
          <PocketItem/>
          <PocketItem/>
          <PocketItem/>
          <PocketItem/>
          <PocketItem/>
          <PocketItem/>
          <PocketItem/>
          <PocketItem/>
          <PocketItem/>
        </div>
      </ContentBox>
    </div>
  )
}
