using System.Collections.Generic;

namespace CRMCore.Framework.Entities
{
    public class PaginatedItem<TResponse> : ValueObjectBase
    {
        public PaginatedItem(int totalItems, int totalPages, IReadOnlyList<TResponse> items)
        {
            TotalItems = totalItems;
            TotalPages = totalPages;
            Items = items;
        }

        public int TotalItems { get; private set; }

        public int TotalPages { get; private set; }

        public IReadOnlyList<TResponse> Items { get; private set; }

        protected override IEnumerable<object> GetEqualityComponents()
        {
            yield return TotalItems;
            yield return TotalPages;
            yield return Items;
        }
    }
}