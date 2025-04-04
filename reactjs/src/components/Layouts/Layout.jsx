import { HeaderPublic } from './HeaderFooter';

export const PublicLayout=()=> {
  return (
    <div>
      <HeaderPublic />
    </div>
  );
}


export default function PrivateLayout(params) {
    return (
      <div>
        {/* <Header /> */}
      </div>
    );
  }
  