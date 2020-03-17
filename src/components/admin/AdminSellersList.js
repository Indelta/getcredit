import React from 'react';
import AdminSeller from './AdminSeller';

function AdminSellersList ({sellersList, deleteSeller, updateSellerData}) {
    return (
        <div id="sellersList">
            {
                sellersList.map((item, index) => {
                    return <AdminSeller
                                item={item}
                                key={index} 
                                deleteSeller={deleteSeller}
                                updateSellerData={updateSellerData}
                            />
                })
            }
        </div>
    );
}

export default AdminSellersList;