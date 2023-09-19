import ContentBox from "../../components/content-box";
import './styles.scss';


export default function Pockets() {
  return (
    <div className="pockets">
      <h2 className="pockets__title">Pockets</h2>
      <ContentBox>
        <div className="pockets__list">
          <div className="pockets__item">
            <div className="pockets__item-img">
            </div>
            <div className="pockets__item-content">
              <p>Pocket address</p>
            </div>
          </div>
        </div>
      </ContentBox>
    </div>
  )
}
