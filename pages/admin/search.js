import Select from 'react-select'
import Portal_Layout from '../../components/portal/portal_Layout';

const DisplayCandidates = (props) => {

  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]
  return (
    <Portal_Layout activeTabName='dashboard' activeChildTabName='' userType='admin'>

    <div>
      <h1>Display Candidates</h1>
     
      <Select options={options} />
      
    </div>
    </Portal_Layout>
  );
}

export default DisplayCandidates;