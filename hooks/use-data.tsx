import { useEffect, useState } from "react"
import { getAllCategories } from "@/lib/actions/category.actions"
import { getAllBrands } from "@/lib/actions/brand.actions"
import { getAllUsers } from "@/lib/actions/user.actions"
import { getAllWarehouses } from "@/lib/actions/warehouse.actions"

type IUserData = {
  id: string,
  name: string,
}

export const useData = () => {
  const [users, setUsers] = useState<IUserData[] | null>(null)
  const [categories, setCategories] = useState<ICategory[] | null>(null)
  const [brands, setBrands] = useState<IBrand[] | null>(null)
  const [warehouses, setWarehouses] = useState<IWarehouse[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [cats, brs, users, whs] = await Promise.all([
          getAllCategories(),
          getAllBrands(),
          getAllUsers(),
          getAllWarehouses(),
        ])
        setCategories(cats.categories)
        setBrands(brs.brands)
        setWarehouses(whs.warehouses)
        const formattedUsers = users?.map((user: IUser) => ({
          id: user.id,
          name: `${user.firstname} ${user.lastname}`,
        }))
        setUsers(formattedUsers || null)
      } catch (err: unknown) {
        setError("Erreur lors du chargement des données.")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return {
    categories,
    warehouses,
    brands,
    users,
    loading,
    error,
  }
}
