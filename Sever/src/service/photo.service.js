class photoService {
    //首页照片流
    async getAll(pageinfo){
        const {page,limit} = pageinfo;
        return {
            page:page,
            limit:limit,
        }
    }
}

module.exports = new photoService();