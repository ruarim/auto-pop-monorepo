interface ItemCardProps {
  name: string
  price: number
  id: number //is this the correct return type
  refresh: (id: number) => void
}

const ItemCard = ({ name, price, id, refresh }: ItemCardProps) => {
  return (
    <>
      <div className="text-2xl">NAME HERE</div>
    </>
  )
}

export default ItemCard
