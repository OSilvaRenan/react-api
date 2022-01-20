import styles from './Pagination.module.css';

function Pagination(props: any) {

    function Voltar(){
        const validation = props.currentPage;
       if(validation > 0){
            props.setCurrentPage(Number(validation - 1)) ;
       }
    } 
    function Avancar(){
        const validation = props.currentPage;
        const page =  props.pages - 1;

       if(validation < page){
            props.setCurrentPage(Number(validation + 1)) ;
        }
    }  


    const pagination =  Array.from(Array(props.pages), (item, index) => {
        return <button className={styles.paginator} value={index} onClick={(e: any) => props.setCurrentPage(Number(e.target.value))} key={index}>{index +1}</button>
      });

    return(
        <div className={styles.links}>
            <button className={styles.paginator} onClick={Voltar}> &laquo; </button>
                {pagination} 
            <button className={styles.paginator} onClick={Avancar}> &raquo; </button>
        </div>
    )
}

export default Pagination;
