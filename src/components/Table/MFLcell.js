import React, {useEffect, useState} from 'react';
import { getMflCode } from 'common/utils';

export default function MFLcell(props) {
  const { dhis_code } = props;

  const abortReqs = new AbortController();

  const [mflCode, setMflCode] = useState('Loading...')

  useEffect(() => {
	  (()=>{
		setMflCode( getMflCode(dhis_code) )
	  })()
	  return () => {
		//   getMflCode(null,{signal: abortReqs.abort()})
		console.log(`cancelling getMflCode(${dhis_code})`);
	  }
  }, [dhis_code])
  return (
    <div>
      {mflCode}
    </div>
  );
}
